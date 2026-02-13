import { prisma } from '../src';

async function main() {
  console.log('Start seeding...');
  
  // Create test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      subscription: 'free',
      birthDate: new Date('1970-01-01'),
      gender: 'male',
      maritalStatus: 'married',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      lifeExpectancy: 85,
    },
  });
  
  console.log(`Created user with id: ${user.id}`);
  
  // Create sample accounts
  const accounts = await prisma.account.createMany({
    data: [
      {
        userId: user.id,
        name: '401k',
        type: '_401k',
        currentBalance: 500000,
        monthlyContribution: 1500,
        employerMatchPercent: 4,
        employerMatchMax: 6,
        taxTreatment: 'pre_tax',
        stockAllocation: 70,
        bondAllocation: 25,
        cashAllocation: 5,
        rmdStartAge: 73,
      },
      {
        userId: user.id,
        name: 'Roth IRA',
        type: 'roth_ira',
        currentBalance: 100000,
        monthlyContribution: 500,
        employerMatchPercent: 0,
        employerMatchMax: 0,
        taxTreatment: 'post_tax',
        stockAllocation: 80,
        bondAllocation: 15,
        cashAllocation: 5,
      },
    ],
  });
  
  console.log(`Created ${accounts.count} accounts`);
  
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
