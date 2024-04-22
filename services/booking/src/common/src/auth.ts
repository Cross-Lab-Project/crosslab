import { baseConfig } from './config';

let institutePrefixURL: URL[];

function convertInstitutionPrefix(): void {
  if (!institutePrefixURL) {
    institutePrefixURL = [];
    for (let i = 0; i < baseConfig.InstitutePrefix.length; i++) {
      try {
        let url = new URL(baseConfig.InstitutePrefix[i]);
        institutePrefixURL.push(url);
      } catch (e) {
        console.error(
          'Skipping' + baseConfig.InstitutePrefix[i] + 'for belonging check:',
          e,
        );
      }
    }
  }
}

export function BelongsToUs(url: URL): boolean {
  convertInstitutionPrefix();
  for (let i = 0; i < institutePrefixURL.length; i++) {
    if (url.hostname == institutePrefixURL[i].hostname) {
      return true;
    }
  }
  return false;
}

// app.initService({JWTVerify: (_jwt, _scopes) => {return {username: "testuser"}}})
