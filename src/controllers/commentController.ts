// src/controllers/commentController.ts
import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

// Helper untuk mengubah ID string ke number dengan aman
const parseId = (idStr: string | string[] | undefined): number => {
  const value = Array.isArray(idStr) ? idStr[0] : idStr;
  if (!value) throw new Error("ID tidak valid");
  const id = parseInt(value, 10);
  if (isNaN(id)) throw new Error("ID tidak valid");
  return id;
};
// 1. CREATE (Membuat Komentar Baru)
export const createComment = async (req: Request, res: Response) => {
  try {
    const { text, authorId, postId } = req.body ?? {};

    if (!text || !authorId || !postId) {
      return res.status(400).json({ success: false, message: "Text, authorId, dan postId wajib diisi" });
    }

    const comment = await prisma.comment.create({
      data: { text, authorId: Number(authorId), postId: Number(postId) },
    });

    return res.status(201).json({ success: true, message: "Komentar berhasil dibuat", data: comment });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. READ (Melihat Semua Komentar)
export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { id: true, name: true, email: true } },
        post: { select: { id: true, title: true } }
      }
    });
    return res.status(200).json({ success: true, message: "Berhasil mengambil semua komentar", data: comments });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. UPDATE (Mengubah Isi Komentar Berdasarkan ID)
export const updateComment = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);
    const { text } = req.body ?? {};

    if (!text) {
      return res.status(400).json({ success: false, message: "Text wajib diisi untuk mengupdate komentar" });
    }

    const comment = await prisma.comment.update({
      where: { id },
      data: { text },
    });

    return res.status(200).json({ success: true, message: "Komentar berhasil diupdate", data: comment });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. DELETE (Menghapus Komentar Berdasarkan ID)
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const id = parseId(req.params.id);

    await prisma.comment.delete({ where: { id } });
    return res.status(200).json({ success: true, message: "Komentar berhasil dihapus" });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};