import { extractInformationFromGithubUrl } from '../utils/url';
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
