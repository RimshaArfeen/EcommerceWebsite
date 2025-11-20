import { prisma } from "./lib/prisma.js"; // adjust path if needed
import {slugify} from "./app/utils/index.js";

async function backfillCategorySlugs() {
  try {
    const categories = await prisma.category.findMany();

    for (const category of categories) {
      if (!category.slug && category.name) {
        const slug = slugify(category.name, { lower: true });
        await prisma.category.update({
          where: { id: category.id },
          data: { slug },
        });
        console.log(`Updated category "${category.name}" with slug "${slug}"`);
      }
    }

    console.log("✅ All missing slugs have been backfilled.");
  } catch (error) {
    console.error("Error backfilling slugs:", error);
  } finally {
    await prisma.$disconnect();
  }
}

backfillCategorySlugs();
