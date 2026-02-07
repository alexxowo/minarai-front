import type { Route } from "./+types/home";
import { redirect } from "react-router";

export async function loader({ }: Route.LoaderArgs) {
  return redirect("/login");
}

export default function Home() {
  return null;
}
