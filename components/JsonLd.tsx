/**
 * Renders schema.org structured data as a JSON-LD script. `<` is escaped so
 * content from the CMS (job descriptions, blog text) can never close the
 * script tag early.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
