
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export const generateCourseSlug = (title) => {
  return slugify(title);
};

export const generateQuizSlug = (title) => {
  return `quiz-${slugify(title)}`;
};
