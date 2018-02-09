var GIPHY_PUB_KEY = 'w3AmQwRgn0D7jWLViruDyF8BGZ9q0d3u',
    GIPHY_API_URL = 'https://api.giphy.com';


App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });

        this.getGif(searchingText)
            .then ((gif) =>{
                this.setState({
                loading: false,
                gif: gif,
                searchingText: searchingText
                }); 
            })
            
            .catch ((error) => console.log(error));
    },

    getGif: function(searchingText) {
        return new Promise ((resolve, reject) =>{
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
        
            xhr.onload = function() {
                if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data;
                var gif = {};

                    if(data.length !== 0) {
                        gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url,
                        };
                    } else {
                        gif = {
                            url: 'nonMatches.png',
                            sourceUrl: '',
                        };
                    }
                    resolve(gif);
                }
                else {
                    reject(xhr.statusText);
                }
            };
            xhr.send();
                
        })

    },
                


    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );

        
    }
});



