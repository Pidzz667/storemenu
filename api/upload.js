import { put } from "@vercel/blob";

export const config = { api: { bodyParser: false } };

export default async function handler(request) {
  if (request.method !== "POST") {
    return Response.json({ success: false, message: "Method harus POST." }, { status: 405 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return Response.json({ success: false, message: "File gambar tidak ditemukan." }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return Response.json({ success: false, message: "File harus berupa gambar." }, { status: 400 });
    }
    if (file.size > 8 * 1024 * 1024) {
      return Response.json({ success: false, message: "Ukuran gambar maksimal 8 MB." }, { status: 413 });
    }

    const blob = await put(`pidz-tools/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`, file, {
      access: "public",
      addRandomSuffix: true
    });

    return Response.json({ success: true, url: blob.url });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Upload gagal. Hubungkan Vercel Blob Storage ke project terlebih dahulu.",
      detail: error?.message || "unknown error"
    }, { status: 500 });
  }
}
