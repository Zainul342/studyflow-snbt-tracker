import { PrismaClient } from '@prisma/client';
import { SUBTES_STRUCTURE, getAllSubmateri } from '../lib/data/materi-structure';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding StudyFlow database...');
    console.log(`📊 Total subtes: ${SUBTES_STRUCTURE.length}`);

    // Clear existing data (optional - be careful in production!)
    // await prisma.userProgress.deleteMany({});
    // await prisma.submateri.deleteMany({});
    // await prisma.materi.deleteMany({});
    // await prisma.subtes.deleteMany({});

    // Seed Subtes
    console.log('📝 Seeding Subtes...');
    for (const subtesData of SUBTES_STRUCTURE) {
        const subtes = await prisma.subtes.upsert({
            where: { id: subtesData.id },
            update: {
                name: subtesData.name,
                code: subtesData.code,
                description: subtesData.description,
                order: subtesData.order
            },
            create: {
                id: subtesData.id,
                name: subtesData.name,
                code: subtesData.code,
                description: subtesData.description,
                order: subtesData.order
            }
        });
        console.log(`  ✅ ${subtes.code}: ${subtes.name}`);

        // Seed Materi
        for (const materiData of subtesData.materi) {
            const materi = await prisma.materi.upsert({
                where: { id: materiData.id },
                update: {
                    name: materiData.name,
                    subtesId: subtes.id,
                    order: materiData.order
                },
                create: {
                    id: materiData.id,
                    name: materiData.name,
                    subtesId: subtes.id,
                    order: materiData.order
                }
            });

            // Seed Submateri
            for (const submateriData of materiData.submateri) {
                await prisma.submateri.upsert({
                    where: { id: submateriData.id },
                    update: {
                        name: submateriData.name,
                        materiId: materi.id,
                        order: submateriData.order,
                        isAdvanced: submateriData.isAdvanced || false
                    },
                    create: {
                        id: submateriData.id,
                        name: submateriData.name,
                        materiId: materi.id,
                        order: submateriData.order,
                        isAdvanced: submateriData.isAdvanced || false
                    }
                });
            }
        }
    }

    // Count totals
    const subtesCount = await prisma.subtes.count();
    const materiCount = await prisma.materi.count();
    const submateriCount = await prisma.submateri.count();

    console.log('\n📊 Database Seeding Summary:');
    console.log(`  Subtes: ${subtesCount} (7 expected)`);
    console.log(`  Materi: ${materiCount} (~30 expected)`);
    console.log(`  Submateri: ${submateriCount} (93 expected)`);

    if (submateriCount === 93) {
        console.log('🎉 SEMUA 93 SUBMATERI BERHASIL DI-SEED!');
    } else {
        console.warn(`⚠️  Jumlah submateri: ${submateriCount} (harusnya 93)`);
    }

    console.log('\n✅ Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });