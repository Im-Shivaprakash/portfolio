import { getContent, getContentFolder } from "@/lib/content";
import { serialize } from "next-mdx-remote/serialize";
import DesktopClient from "@/components/DesktopClient";

export default async function Home() {
  const bio = getContent("bio.mdx");
  const contacts = getContent("contacts.mdx");
  const projects = getContentFolder("projects");
  const experience = getContentFolder("experience");
  const blogs = getContentFolder("blogs");

  const serializedBio = await serialize(bio.content);
  const serializedContacts = await serialize(contacts.content);

  const serializedProjects = await Promise.all(
    projects.map(async (p) => ({
      meta: p.meta,
      slug: p.slug,
      mdx: await serialize(p.content),
    }))
  );

  const serializedExperience = await Promise.all(
    experience.map(async (e) => ({
      meta: e.meta,
      slug: e.slug,
      mdx: await serialize(e.content),
    }))
  );

  const serializedBlogs = await Promise.all(
    blogs.map(async (b) => ({
      meta: b.meta,
      slug: b.slug,
      mdx: await serialize(b.content),
    }))
  );

  return (
    <DesktopClient
      content={{
        bio: serializedBio,
        contacts: serializedContacts,
        projects: serializedProjects,
        experience: serializedExperience,
        blogs: serializedBlogs,
      }}
    />
  );
}
