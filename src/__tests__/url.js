import { extractInformationFromGithubUrl, createFetchFileRoute } from '../utils/url';
import GitUrlParse from 'git-url-parse';
jest.mock('git-url-parse');

describe('extractInformationFromGithubUrl', () => {
  it('returns owner, repo, filePath and ref', () => {
    GitUrlParse.mockReturnValue({
      ref: 'master',
      owner: 'foo',
      filePath: 'index.js',
      name: 'bar',
    });

    expect(extractInformationFromGithubUrl()).toMatchSnapshot();
  });
});

describe('createFetchFileRoute', () => {
  it('createFetchFileRoute creates route', () => {
    expect(createFetchFileRoute('foo', 'bar', 'doc.md')).toBe(
      `https://api.github.com/repos/bar/foo/contents/doc.md`,
    );
    expect(createFetchFileRoute('foo', 'bar', 'doc.md', 'develop')).toBe(
      `https://api.github.com/repos/bar/foo/contents/doc.md?ref=develop`,
    );
  });
});
