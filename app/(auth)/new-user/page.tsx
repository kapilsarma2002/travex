import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id,
    }
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
      }
    })
  }

  redirect('/dashboard');
}

const NewUser = async () => {
  await createNewUser();
  return <div>
    <div className="loader border-t-transparent border-4 border-white rounded-full w-8 h-8 animate-spin" />
  </div>;
}

export default NewUser;