import { Module, Scope } from '@nestjs/common';
import { PrismaService } from '@main/db/prisma.service';
import { REQUEST } from '@nestjs/core';
import { AuthRequest } from '@main/auth/authentication/interface/auth.request';
import { UserRole } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type WhereArg = Record<string, unknown>;
type DataArg = Record<string, unknown>;

interface PrismaArgs {
  where?: WhereArg;
  data?: DataArg | DataArg[];
  [key: string]: unknown;
}

@Module({
  providers: [
    {
      provide: PrismaService,
      scope: Scope.REQUEST,
      useFactory: (request: AuthRequest) => {
        const user = request.user;
        const prisma = new PrismaClient();

        // Solo extender Prisma si NO es super admin
        if (user && user.role !== UserRole.SUPER_ADMIN) {
          return prisma.$extends({
            query: {
              $allModels: {
                async $allOperations({ model, operation, args, query }) {
                  // Modelos afectados por multi-tenancy
                  const protectedModels = [
                    'Gym',
                    'User',
                    'Class',
                    'Student',
                    'Payment',
                    'Inventory',
                    'Exercise',
                    'Membership',
                  ];

                  if (model && protectedModels.includes(model)) {
                    const newArgs: PrismaArgs = { ...(args as PrismaArgs) };

                    const filterOps = [
                      'findUnique',
                      'findFirst',
                      'findMany',
                      'update',
                      'updateMany',
                      'delete',
                      'deleteMany',
                      'count',
                    ];

                    // Añadir gymId automáticamente
                    if (filterOps.includes(operation)) {
                      newArgs.where = {
                        ...(newArgs.where ?? {}),
                        gymId: user.gymId,
                      };
                    }

                    // CREATE
                    else if (operation === 'create') {
                      newArgs.data = {
                        ...(newArgs.data as DataArg),
                        gymId: user.gymId,
                      };
                    }

                    // CREATE MANY
                    else if (operation === 'createMany') {
                      if (Array.isArray(newArgs.data)) {
                        newArgs.data = newArgs.data.map((item) => ({
                          ...item,
                          gymId: user.gymId,
                        }));
                      }
                    }

                    return query(newArgs);
                  }

                  // Modelos que no requieren filtrado
                  return query(args);
                },
              },
            },
          });
        }

        return prisma;
      },
      inject: [REQUEST],
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
