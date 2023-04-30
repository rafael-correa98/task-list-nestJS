-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "fk_id_user" TEXT NOT NULL,
    CONSTRAINT "tasks_fk_id_user_fkey" FOREIGN KEY ("fk_id_user") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
