// @flow

const regex = /^[a-zA-Z\u00C0-\u017F]+ ?[a-zA-Z\u00C0-\u017F]*.?(:|\.)/g;

const addSkillTypeTags = (description?: string = '') =>
  description
    .split(/\n|<br>|<br\/>/g)
    .map((block) => block.replace(regex, (match) => (match !== block ? `<c=@skill>${match}</c>` : match)))
    .join('\n');

export default addSkillTypeTags;
