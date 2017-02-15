import { CliTestPage } from './app.po';

describe('cli-test App', function() {
  let page: CliTestPage;

  beforeEach(() => {
    page = new CliTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
