import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import UserModel from "@/models/User";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const body = await req.json();
    const updated = await UserModel.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updated) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Errore nella PUT:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const deleted = await UserModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Errore nella DELETE:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
