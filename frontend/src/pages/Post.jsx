import { useState } from "react";

const MAX_TAGS = 3;

function parseTags(raw) {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t !== "");
}

function validate(type, v) {
  const errors = {};
  const title = v.title.trim();

  if (!title) errors.title = "Please enter a title.";
  else if (title.length < 5) errors.title = "Title must be at least 5 characters.";
  else if (title.length > 120) errors.title = "Title must be 120 characters or fewer.";

  if (type === "question") {
    const d = v.description.trim();
    if (!d) errors.description = "Please describe your problem.";
    else if (d.length < 20) errors.description = "Please give a bit more detail (at least 20 characters).";
  } else {
    const a = v.abstract.trim();
    const t = v.articleText.trim();
    if (!a) errors.abstract = "Please enter an abstract.";
    else if (a.length < 20) errors.abstract = "Abstract must be at least 20 characters.";
    else if (a.length > 500) errors.abstract = "Abstract must be 500 characters or fewer.";
    if (!t) errors.articleText = "Please enter your article text.";
    else if (t.length < 50) errors.articleText = "Article text must be at least 50 characters.";
  }

  const tags = parseTags(v.tags);
  const lower = tags.map((t) => t.toLowerCase());
  if (tags.length > MAX_TAGS) errors.tags = `You can add up to ${MAX_TAGS} tags only.`;
  else if (new Set(lower).size !== lower.length) errors.tags = "Tags must be unique.";
  else if (tags.some((t) => t.length > 20)) errors.tags = "Each tag must be 20 characters or fewer.";

  return errors;
}

const EMPTY = { title: "", description: "", abstract: "", articleText: "", tags: "" };

const inputCls =
  "w-full border border-slate-700 bg-white px-2 py-1 text-xs placeholder:text-slate-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500";

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

export default function Post() {
  const [postType, setPostType] = useState("question"); // "question" | "article"
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const isQuestion = postType === "question";

  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  function changeType(type) {
    setPostType(type);
    setErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(postType, values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      alert("Your post could not be sent. Please fix the highlighted fields.");
      return;
    }

    alert(`Your ${postType} has been sent successfully!`);
    setValues(EMPTY);
  }

  return (
    <main className="mx-auto my-6 w-full max-w-4xl px-4 font-mono text-xs text-slate-900">
      {/* New Post bar */}
      <h1 className="bg-gray-200 px-2 py-1.5 font-bold">New Post</h1>

      {/* Post type selector */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-1 py-3">
        <span>Select Post Type:</span>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="postType"
            value="question"
            checked={isQuestion}
            onChange={() => changeType("question")}
          />
          Question
        </label>
        <label className="ml-4 flex items-center gap-1">
          <input
            type="radio"
            name="postType"
            value="article"
            checked={!isQuestion}
            onChange={() => changeType("article")}
          />
          Article
        </label>
      </div>

      {/* Section bar */}
      <h2 className="bg-gray-200 px-2 py-1.5 font-bold">What do you want to ask or share</h2>

      <p className="mx-auto max-w-3xl px-4 py-2 text-center">
        This section is designed based on the type of the post. It could be developed by
        conditional rendering.{" "}
        <span className="text-red-600">
          {isQuestion
            ? "For post a question, the following section would be appeared."
            : "For post an article, the following section would be appeared."}
        </span>
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5 px-1">
        {/* Title (both types) */}
        <div>
          <div className="flex items-center gap-3">
            <label htmlFor="title" className="font-bold">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={values.title}
              onChange={set("title")}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              placeholder={
                isQuestion
                  ? "Start your question with how, what, why, etc."
                  : "Enter a descriptive title"
              }
              className={inputCls}
            />
          </div>
          <FieldError id="title-error" message={errors.title} />
        </div>

        {/* Conditional rendering: Question vs Article fields */}
        {isQuestion ? (
          <div>
            <label htmlFor="description" className="mb-2 block">
              Describe your problem
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={set("description")}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              className={`${inputCls} h-80 resize-y`}
            />
            <FieldError id="description-error" message={errors.description} />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="abstract" className="mb-2 block">
                Abstract
              </label>
              <textarea
                id="abstract"
                name="abstract"
                value={values.abstract}
                onChange={set("abstract")}
                aria-invalid={!!errors.abstract}
                aria-describedby={errors.abstract ? "abstract-error" : undefined}
                placeholder="Enter a 1-paragraph abstract"
                className={`${inputCls} h-24 resize-y`}
              />
              <FieldError id="abstract-error" message={errors.abstract} />
            </div>
            <div>
              <label htmlFor="articleText" className="mb-2 block">
                Article Text
              </label>
              <textarea
                id="articleText"
                name="articleText"
                value={values.articleText}
                onChange={set("articleText")}
                aria-invalid={!!errors.articleText}
                aria-describedby={errors.articleText ? "articleText-error" : undefined}
                placeholder="Enter your article text"
                className={`${inputCls} h-72 resize-y`}
              />
              <FieldError id="articleText-error" message={errors.articleText} />
            </div>
          </>
        )}

        {/* Tags (both types) */}
        <div>
          <div className="flex items-center gap-2">
            <label htmlFor="tags" className="font-bold">
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              value={values.tags}
              onChange={set("tags")}
              aria-invalid={!!errors.tags}
              aria-describedby={errors.tags ? "tags-error" : undefined}
              placeholder={`Please add up to ${MAX_TAGS} tags to describe what your ${postType} is about e.g., Java`}
              className={inputCls}
            />
          </div>
          <FieldError id="tags-error" message={errors.tags} />
        </div>

        {/* Post button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="w-44 bg-gray-400 py-2 text-sm text-slate-900 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
}