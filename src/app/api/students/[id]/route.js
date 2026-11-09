import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

function errorResponse(error) {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)
      .map((e) => e.message)
      .join(", ");
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
  if (error.code === 11000) {
    return NextResponse.json(
      { success: false, error: "A student with this email already exists" },
      { status: 409 }
    );
  }
  return NextResponse.json(
    { success: false, error: error.message || "Server error" },
    { status: 500 }
  );
}

function invalidId() {
  return NextResponse.json(
    { success: false, error: "Invalid student ID" },
    { status: 400 }
  );
}

function notFound() {
  return NextResponse.json(
    { success: false, error: "Student not found" },
    { status: 404 }
  );
}

export async function GET(_request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalidId();
    await connectDB();
    const student = await Student.findById(id);
    if (!student) return notFound();
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalidId();
    await connectDB();
    const { name, email, phone, department } = await request.json();
    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, phone, department },
      { new: true, runValidators: true }
    );
    if (!student) return notFound();
    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) return invalidId();
    await connectDB();
    const student = await Student.findByIdAndDelete(id);
    if (!student) return notFound();
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return errorResponse(error);
  }
}
