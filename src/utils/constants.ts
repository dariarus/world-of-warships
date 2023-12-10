export const WARSHIPS_API_URL = 'https://vortex.korabli.su/api/graphql/glossary/';
export const QUERY = `{
            vehicles {
              id
              title
              description
              icons {
                large
                medium
              }
              level
              type {
                name
                title
                icons {
                  default
                }
              }
              nation {
                name
                title
                color
                icons {
                  small
                  medium
                  large
                }
              }
            }
          }`;

export const widthOfOneElement = 220;
export const fullWindowWidth = 1342;

export const initialFieldsValue = 'all';

export const visibleItemsInSlider = 9;
export const moreVisibleItemsInSlider = 2;
export const visibleItemsInFullList = 24;