import { BUTTON_ID, BUTTON_TEXT } from '../../common/consts';
import { BitbucketPRHandler } from './bitbucketPRHandler';

describe('only handles correct URLs', () => {
  const cases = [
    {
      description: 'non-bitbucket URL',
      url: 'https://google.com',
      expected: false,
    },
    {
      description: 'non-bitbucket URL with /pull/',
      url: 'https://google.com/laurazard/demo-app/pull-requests/1/test-pr',
      expected: false,
    },
    {
      description: 'Bitbucket PRs dashboard URL',
      url: 'https://bitbucket.org/laurazard/demo-app/pull-requests/',
      expected: false,
    },
    {
      description: 'Bitbucket PR URL',
      url: 'https://bitbucket.org/laurazard/demo-app/pull-requests/1/test-pr',
      expected: true,
    },
    {
      description: 'Bitbucket Repo URL',
      url: 'https://bitbucket.org/laurazard/demo-app/src/main/',
      expected: false,
    },
    {
      description: 'Bitbucket Repo URL with branch',
      url: 'https://bitbucket.org/laurazard/demo-app/src/feature-hello/',
      expected: false,
    },
  ];

  const handler = new BitbucketPRHandler();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  it.each(cases)('correctly handles a $description', ({ description, url, expected }) => {
    expect(handler.canHandlePage(url)).toBe(expected);
  });
});

describe('load', () => {
  it('injects button', () => {
    document.body.innerHTML = `
      <div>
        <div>
          <button>
            <span>
              <span>
                <span>Merge</span>
              </span>
            </span>
          </button>
        </div>
      </>
    `;

    const handler = new BitbucketPRHandler();
    handler.load();

    expect(document.getElementById(BUTTON_ID).textContent).toBe(BUTTON_TEXT);
  });
});
