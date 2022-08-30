export default function SimpleMarkdownPage({ markdownContent }) {
  return (
    <div className="flex flex-col md:items-center">
      <main className="prose text-sm md:text-base">
        <div dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </main>
    </div>
  );
}
