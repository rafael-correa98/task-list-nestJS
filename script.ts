import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // const user = await prisma.user.create({
    //     data: {
    //         name: 'Alice',
    //         password: '12345'
    //     },
    //   })
    //   console.log(user)

    // const task = await prisma.task.create({
    //     data: {
    //         description: 'compras',
    //         detail: 'sabonete',
    //         fk_id_user: "151afe1f-e1d4-4ed5-94d7-103e1a79dd57"
    //     }
    // })
    // console.log(task)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })