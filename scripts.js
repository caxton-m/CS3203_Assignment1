$(document).ready(function() {
    /*
    * GET or READ button call
    * gets all the tweets in the favs.json file and outputs them
    * in a table format.
    */
    $("#get-all-button").on('click', function(event) {
        // function default and message when button is pressed
        event.preventDefault();
        console.log('get button was pressed');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a default 'GET' method request
            url: '/getTweets',
            contentType: 'application/json',

            // When the request is successful we enter into the output function
            success: function(response) {
                console.log(response);

                // get the thead and tbody format from the html file to update it
                let theadEl = $("#myTable > thead");
                let tbodyEl = $("#myTable > tbody");

                // empty the thead and tbody if not empty
                theadEl.html('');
                tbodyEl.html('');

                // create the thead format with the titles of the output data
                theadEl.append('\
                    <tr>\
                        <th> ID </th>\
                        <th> Tweet </th>\
                        <th> Created </th>\
                    </tr>\
                ');

                // loop through elements in the favs.json file to output all the
                //  tweets, ids and time created in the tbody format
                response.forEach(function (std){
                   tbodyEl.append('\
                       <tr>\
                            <td class="id">'+ std.id + '</td>\
                            <td class="text">'+ std.text + '</td>\
                            <td class="created_at">' + std.created_at + '</td>\
                       </tr>\
                   ');
                });

            }
        });
    });

    /*
    * GET User button call
    * gets all the users IDs in the favs.json file and outputs them
    * in a table format.
    */
    $("#get-user-button").on('click', function(event) {
        // function default and message when button is pressed
        event.preventDefault();
        console.log('get user was pressed');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a default 'GET' method request
            url: '/getTweets',
            contentType: 'application/json',

            // When the request is successful we enter into the output function
            success: function(response) {
                console.log(response);

                // get the thead and tbody format from the html file to update it
                let theadEl = $("#myTable > thead");
                let tbodyEl = $("#myTable > tbody");

                // empty the thead and tbody if not empty
                theadEl.html('');
                tbodyEl.html('');

                // create the thead format with the titles of the output data
                theadEl.append('\
                    <tr>\
                        <th> ID </th>\
                        <th> Name </th>\
                        <th> ScreenName </th>\
                    </tr>\
                ');

                // loop through elements in the favs.json file to output all the
                //  ids, names and screen name in the tbody format
                response.forEach(function (std){
                    tbodyEl.append('\
                       <tr>\
                            <td class="id">'+ std.user.id + '</td>\
                            <td class="name">'+ std.user.name + '</td>\
                            <td class="screen_name">'+ std.user.screen_name + '</td>\
                       </tr>\
                   ');
                });

            }
        });
    });

    /*
    * GET Tweet button call
    * given the ID number of a tweet, get the tweet text information
    * from favs.json and output it in table format
    */
    $("#get-tweet-button").on('submit', function(event) {
        // function default and message when button is pressed
        event.preventDefault();
        console.log('get tweet pressed');

        // variable to store the input ID number
        var textId = $('#get-text');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a 'POST' method request
            url: '/getTweetId',
            method: 'POST',
            contentType: 'application/json',

            // send the data to the express server
            data: JSON.stringify({
                id: textId.val(),
            }),

            // When the request is successful we enter into the output function
            success: function(response) {
                // get the thead and tbody format from the html file to update it
                let theadEl = $("#myTable > thead");
                let tbodyEl = $("#myTable > tbody");

                // empty the thead and tbody if not empty
                theadEl.html('');
                tbodyEl.html('');

                // create the thead format with the titles of the output data
                theadEl.append('\
                    <tr>\
                        <th> ID </th>\
                        <th> Text </th>\
                        <th> Created </th>\
                    </tr>\
                ');

                // From the favs.json file to output the ID, tweet text
                //  and time created for the element with the given ID
                tbodyEl.append('\
                   <tr>\
                        <td class="id">'+ response[0].id + '</td>\
                        <td class="text">'+ response[0].text + '</td>\
                        <td class="created_at">'+ response[0].created_at + '</td>\
                   </tr>\
               ');

                // Empty the textID variable for future use
                textId.val('');
            }
        });
    });

    /*
    * CREATE button call
    * take in inputs of an ID and tweet text that are added to the
    * favs.json server and output in the table format along with other
    * tweets
    */
    $("#create-form").on('submit', function (event){
        // function default and message when button is pressed
        event.preventDefault();
        console.log('create button was pressed');

        // variable to store the input ID number and input text
        var createInputId = $('#create-id-input');
        var createInputText = $('#create-text-input');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a 'POST' method request
            url: '/createTweets',
            method: 'POST',
            contentType: 'application/json',

            // send the data to the express server
            data: JSON.stringify({
                id: createInputId.val(),
                text: createInputText.val()
            }),

            // When the request is successful we enter into the output function
            success: function (response) {

                // empty the variables and click the get all tweets button
                //  to see if the entries have been created.
                createInputId.val('');
                createInputText.val('');
                $('#get-all-button').click();
            }

        });
    });

    /*
    * UPDATE button call
    * take in inputs of a name and screen names, with the name search for
    * entry in favs.json file and update the screen name for that given element
    * and print all IDs and names in table format
    */
    $('#update-button').on('submit', function (){
        // function default and message when button is pressed
        event.preventDefault();
        console.log('update button was pressed');

        // variable to store the input name and screen name to be
        //  updated
        var name = $('#update-name');
        var updateScreen = $('#update-screen-name');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a 'PUT' method request
            url: '/updateScreenName',
            method: 'PUT',
            contentType: 'application/json',

            // send the data to the express server
            data: JSON.stringify({
                name: name.val(),
                screen_name: updateScreen.val()
            }),
            dataType: 'json',

            // When the request is successful we enter into the output function
            success: function (response){
                console.log(response);
                // click the get users button and check if the screen name has
                //  been updated
                $('#get-user-button').click();
            }
        });

    });

    /*
    * DELETE button call
    * take in input of an ID, with the ID search for entry in favs.json file
    * and delete the entry for that given element and print all remaining texts
    */
    $('#delete-button').on('submit', function (){
        // function default and message when button is pressed
        event.preventDefault();
        console.log('delete button was pressed');

        // variable to store the input ID number
        var id = $('#delete-text');

        // ajax request for the button call
        $.ajax({
            // the url used by the server to complete this request with
            //  a 'DELETE' method request
            url: '/deleteTweets',
            method: 'DELETE',
            contentType: 'application/json',

            // send the data to the express server
            data: JSON.stringify({
                id: id.val()
            }),
            dataType: 'json',

            // When the request is successful we enter into the output function
            success: function (response){
                console.log(response);
                // click the get all tweets button and check if the entry has
                //  been deleted from the server
                $('#get-all-button').click();
            }
        });

    });
});