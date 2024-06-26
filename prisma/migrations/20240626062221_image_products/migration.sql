-- CreateTable
CREATE TABLE "ImageProduct" (
    "id" SERIAL NOT NULL,
    "urlImage" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ImageProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageProduct" ADD CONSTRAINT "ImageProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
