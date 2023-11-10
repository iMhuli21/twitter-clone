import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  profilePicture: f(["image"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file uploaded")),
  bannerPicture: f(["image"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file uploaded")),
  media: f({ image: { maxFileCount: 5 } })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file uploaded")),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
