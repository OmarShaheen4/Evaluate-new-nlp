import {checkForRightURL} from "../src/client/js/checkForRightURL"

test('Test input URL validity', () => {
    expect(checkForRightURL('some string')).toBeFalsy();
    expect(checkForRightURL(55)).toBeFalsy();
    expect(checkForRightURL('$2314nj jn545 %%$$$ ')).toBeFalsy();
    expect(checkForRightURL('https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries')).toBeTruthy();
  })