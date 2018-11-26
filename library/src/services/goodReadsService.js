const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodReadsService');

const parser = xml2js.Parser({ explicityArray: false });

function goodReadsService() {
    function getBookById(id) {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=JQFUfbVigW4dG1QtidzBg`)
                .then((response) => {
                    parser.parseString(response.data, (err, result) => {
                        if (err) {
                            debug(err);
                        } else {
                            // debug(`isbn: ${result.GoodreadsResponse.book}`);
                            // debug(result.GoodreadsResponse.book.description);

                            resolve(result.GoodreadsResponse.book[0]);
                            // resolve({ description: 'nossa descrição' });
                        }
                    });
                })
                .catch((error) => {
                    reject(error);
                    debug(error);
                });
            // resolve({ description: 'nossa descrição' });
        });
    }

    return { getBookById };
}

module.exports = goodReadsService();
