"use server";
import {cookies} from "next/headers";
export async function deleteCartIfAdmin() {
  const Items = cookies().getAll().filter(cookie => cookie.name.startsWith("item_"));
  Items.map(cookie => cookies().delete(cookie.name));
}