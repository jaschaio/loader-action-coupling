import type { Route, Info } from "./+types/home";
import { useState, useEffect } from "react";
import { useFetcher } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const customers = parseInt(String(formData.get("customers")), 10) ?? 0;
  const newProjects = parseInt(String(formData.get("newProjects")), 10) ?? 0;
  const existingProjects =
    parseInt(String(formData.get("existingProjects")), 10) ?? 0;

  return { customers, newProjects, existingProjects };
};

export const loader = () => {
  return { customers: 1, newProjects: 10, existingProjects: 300 };
};

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, submit, state } = useFetcher<Info["actionData"]>();

  const { customers, newProjects, existingProjects } = data || loaderData;

  const [form, setForm] = useState({
    customers,
    newProjects,
    existingProjects,
  });

  useEffect(() => {
    submit(form, { method: "post" });
  }, [form.customers, form.newProjects, form.existingProjects, submit]);

  return (
    <>
      <div>
        <label>
          <p>Referred Customers per Month</p>
          <input
            type="number"
            name="customers"
            value={form.customers}
            onChange={(e) =>
              setForm({ ...form, customers: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <div>
        <label>
          <p>Avg. new projects per month</p>
          <input
            type="number"
            name="newProjects"
            value={form.newProjects}
            onChange={(e) =>
              setForm({ ...form, newProjects: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <div>
        <label>
          <p>Avg.existing projects</p>
          <input
            type="number"
            name="existingProjects"
            value={form.existingProjects}
            onChange={(e) =>
              setForm({ ...form, existingProjects: Number(e.target.value) })
            }
          />
        </label>
      </div>
      {state !== "idle" ? (
        "Loading..."
      ) : (
        <pre>{JSON.stringify(data || loaderData, null, 2)}</pre>
      )}
    </>
  );
}
