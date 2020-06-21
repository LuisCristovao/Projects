//Search Engine----------------------------
class SearchEngine {
    //this.suggestions_index;



    constructor() {
        this.tagsdb;
        this.suggestions_index = 0
        this.getTags()
        this.search_suggestions = []
    }

    invertArrayOrder(array) {
        var new_arr = []
        for (var i = array.length - 1; i >= 0; i--) {
            new_arr.push(array[i])
        }
        return new_arr
    }
    async getDBPosts() {
        let response = await fetch('SiteFolder/DB/all_posts.json');
        let val = await response.json();
        return val
    }
    async getTags() {
        let response = await fetch('SiteFolder/DB/tags.json');
        let val = await response.json();
        this.tagsdb = val
    }
    getQuery() {
        try {
            return window.location.search.split("=")[1].split("+")
        } catch {
            return null
        }
    }
    orderTuples(tuple_array) {
        /*
        receives tuples_array like ("word",number) and order by number bigger to lower
        */
        var i = 0,
            j = 0,
            any_change = false,
            needs_change = true,
            order_list = tuple_array;
        while (needs_change && order_list.length > 1) {
            var value = order_list[i][1];
            j = i + 1;
            if (order_list[j][1] > value) {
                var auxj = order_list[j];
                var auxi = order_list[i];
                order_list[i] = auxj;
                order_list[j] = auxi;
                any_change = true;
            }
            i++;
            if (i == order_list.length - 1) {
                i = 0;
                //There was no change so it's ordered
                if (!any_change) {
                    needs_change = false;
                } else {
                    any_change = false;
                }
            }
        }
    }
    orderBestIndex(selected_posts_map) {
        var ordered_posts_id = []
        var ordered_posts_tuple = []
        var ordered = false
        //insert in array the tuples
        for (var index in selected_posts_map) {
            ordered_posts_tuple.push({
                "id": index,
                "value": selected_posts_map[index]
            })
        }
        var change = false
        //order array with inverted buble sort (decrescent)
        if (ordered_posts_tuple.length > 1) {

            for (var i = 0; !ordered; i = (i + 1) % (ordered_posts_tuple.length - 1)) {
                if (ordered_posts_tuple[i]["value"] < ordered_posts_tuple[i + 1]["value"]) {
                    //change order
                    var backup = ordered_posts_tuple[i]
                    ordered_posts_tuple[i] = ordered_posts_tuple[i + 1]
                    ordered_posts_tuple[i + 1] = backup
                    change = true
                }
                if ((i + 1) == ordered_posts_tuple.length - 1) {
                    if (change == false) {
                        ordered = true
                    } else {
                        change = false
                    }
                }

            }
        }
        //return only posts id's
        for (var i in ordered_posts_tuple) {
            ordered_posts_id.push(ordered_posts_tuple[i]["id"])
        }
        return ordered_posts_id
    }



    arrayUpperCase(array) {
        var new_array = []
        for (var i = 0; i < array.length; i++) {
            var val = array[i]
            new_array.push(val.toUpperCase())
        }
        return new_array
    }



    async findPosts() {
        var select_posts = {}
        var all_posts = await this.getDBPosts()
        var query_tags = this.arrayUpperCase(this.getQuery()) //array with tags
        query_tags = query_tags.map(el => decodeURIComponent(el))
        for (var i in all_posts) {
            var post = all_posts[i]
            var post_tags = this.arrayUpperCase(post['search tags'].split(",").map(el => el.trim()))
            post_tags = post_tags.concat(this.arrayUpperCase(post['secondary search tags'].split(",").map(el => el.trim())))
            for (var j in post_tags) {
                for (var e in query_tags) {
                    if (query_tags[e] == post_tags[j]) {
                        if (select_posts[i] == null) {
                            select_posts[i] = 1
                        } else {
                            var num = select_posts[i]
                            num++
                            select_posts[i] = num
                        }
                    }
                }
            }

        }
        var ids = this.orderBestIndex(select_posts)
        //get posts from id's
        select_posts = []
        for (var i in ids) {
            select_posts.push(all_posts[ids[i]])
        }
        return select_posts
    }
    highLight(suggestion_div) {
        //console.log(suggestion_div)
        suggestion_div.style = "background-color:rgba(50,100,200,0.7);color:rgb(255,255,255);"

    }
    stopHighLight(suggestion_div) {
        suggestion_div.style = ""
    }
    clickSuggestion(suggestion_div) {
        this.selectSuggestionAction(suggestion_div)

    }
    fillSuggestions(suggestions) {
        var html = ""
        html += '<ul class="list-group list-group-flush">'
        for (var i = 0; i < suggestions.length; i++) {
            var val = suggestions[i]
            html += '<li onmouseover="search_engine.highLight(this)" onmouseout="search_engine.stopHighLight(this)" onclick="search_engine.clickSuggestion(this)" class="list-group-item">' + val + '</li>'
        }
        html += '</ul>'
        return html
    }
    createSuggestionDiv(input, suggestions) {



        var html = ""
        var div;
        if (document.getElementById("suggestions") != null) {
            if (suggestions.length == 0) {
                var el = document.getElementById("suggestions")
                el.parentElement.removeChild(el)
            } else {

                div = document.getElementById("suggestions")
                div.innerHTML = ""
                html += this.fillSuggestions(suggestions)
                div.innerHTML = html
                //update input box position----

                var top = input.parentElement.parentElement.parentElement.offsetTop + input.offsetTop //navbar element top
                var left = input.offsetLeft
                var height = input.offsetHeight
                div.style.position = "absolute"
                div.style.top = top + height + 10 + 'px'
                div.style.left = left + 'px'
            }
        } else {


            if (suggestions.length > 0) {
                var body = document.body
                var width = input.offsetWidth
                var top = input.parentElement.parentElement.parentElement.offsetTop + input.offsetTop //navbar element top + input offsetTop
                var left = input.offsetLeft
                var height = input.offsetHeight
                div = document.createElement("div")
                div.setAttribute("id", "suggestions")
                div.setAttribute("style", "position:absolute")
                div.setAttribute("class", "card")
                div.style.width = width + 'px'
                div.style.top = top + height + 10 + 'px'
                div.style.left = left + 'px'
                html += this.fillSuggestions(suggestions)
                div.innerHTML = html
                body.appendChild(div)
            }
        }

        //}
    }
    circularIndexCalc(index, length) {
        if (index < 0) {
            //assuming the behavior described by Schism (-1 % 3 = -1)
            return length + (index % length);
        }
        return index % length;
    }
    selectSuggestionAction(suggestion) {
        let search_input = document.getElementById("search_input")
        let val = search_input.value
        let actual_tags = val.split(" ")

        this.highLight(suggestion)

        if (val.split(" ").length > 1) {
            actual_tags[actual_tags.length - 1] = suggestion.innerText
            let input_val = ""
            actual_tags = actual_tags.filter(el => el != " " && el != "")
            for (let i = 0; i < actual_tags.length; i++) {
                let el = actual_tags[i]
                if (i == 0) {
                    input_val += el
                } else {
                    input_val += " " + el
                }
            }
            search_input.value = input_val
        } else {
            search_input.value = suggestion.innerText
        }
        $("#search_input").focus() //select input box
        //document.getElementById("search_input").focus()
    }
    selectSuggestion(suggestions, up) {
        var not_selected = true
        var Length = suggestions.children[0].children.length
        for (var i = 0; i < Length; i++) {
            var suggestion = suggestions.children[0].children[i]
            if (suggestion.getAttribute("style") != null && suggestion.getAttribute("style") != "") {
                not_selected = false
                suggestion.style = ""
                //down
                if (!up) {
                    this.selectSuggestionAction(suggestions.children[0].children[this.circularIndexCalc(i + 1, Length)])
                } else {
                    //up
                    this.selectSuggestionAction(suggestions.children[0].children[this.circularIndexCalc(i - 1, Length)])
                }
                break
            }
        }
        if (not_selected) {
            if (!up) {
                //down
                this.selectSuggestionAction(suggestions.children[0].children[0])
            } else {
                //up
                this.selectSuggestionAction(suggestions.children[0].children[Length - 1])
            }
        }
    }
    selectSuggestionWithArrows(up) {
        var suggestions = document.getElementById("suggestions")
        if (suggestions != null) {
            if (up) {
                this.selectSuggestion(suggestions, true)
            } else {
                this.selectSuggestion(suggestions, false)

            }
        }
    }
    suggestionControl(event) {
        //up key
        if (event.keyCode == 38) {
            this.selectSuggestionWithArrows(true)
        }
        //down key
        if (event.keyCode == 40) {
            this.selectSuggestionWithArrows(false)
        }
    }
    onKeyPressSuggestion(search_input, event) {
        //calculate suggestion
        var search_tag = search_input.value.split(" ")[search_input.value.split(" ").length - 1]
        var suggestions = this.calculateSuggestions(search_tag)
        //if keys different from up and down arrow
        if (event.keyCode != 38 && event.keyCode != 40) {

            this.createSuggestionDiv(search_input, suggestions)
        }
        this.suggestionControl(event)
        //this.createSuggestionDiv(search_input, search_input.value.split(" "))

    }
    calculateSuggestions(search_query) {
        var final_suggestions = []
        var suggestions = []
        var compare_index = 0.5
        let show_suggestions_length = 5
        if (search_query != "") {

            //for(var i =0 ;i<search_query_tags.length;i++,compare_index=0.5){
            //var search_query=search_query_tags[i]
            //var first_letter = search_query[0].toUpperCase()
            while (!(suggestions.length >= show_suggestions_length) && compare_index >= 0) {
                suggestions = []
                for (var letter in this.tagsdb) {

                    for (var key in this.tagsdb[letter]) {
                        var compare_value = this.supercompare(search_query.toUpperCase(), key.toUpperCase())
                        if (compare_value > compare_index) {
                            suggestions.push([key, compare_value])
                        }
                        //just test version
                        //suggestions.push(key)
                    }

                }
                if (suggestions.length <= show_suggestions_length) {
                    compare_index -= 0.05
                } else {
                    compare_index += 0.05
                }
            }

            final_suggestions = final_suggestions.concat(suggestions)
            suggestions = []
        }
        //}
        //oreder array of tuples from best to worst compare index
        this.orderTuples(final_suggestions)
        final_suggestions = final_suggestions.map(el => el[0])
        return final_suggestions
    }
    compare(search_word, word) {

    }
    supercompare(search_word, word) {
        //Second method
        var matches = 0;
        var missMatches = 0;
        var word_freq = {}
        var search_freq = {}
        for (var i = 0; i < word.length; i++) {
            //if not exists
            if (word_freq[word[i]] == null) {
                word_freq[word[i]] = 1;
            } //already exists
            else {
                var count = word_freq[word[i]];
                count++;
                word_freq[word[i]] = count;
            }
        }
        for (var i = 0; i < search_word.length; i++) {
            //if not exists
            if (search_freq[search_word[i]] == null) {
                search_freq[search_word[i]] = 1;
            } //already exists
            else {
                var count = search_freq[search_word[i]];
                count++;
                search_freq[search_word[i]] = count;
            }
        }
        //
        matches = 0;
        missMatches = 0;
        for (var key in search_freq) {
            //both have same letter
            if (search_freq[key] != null && word_freq[key] != null) {


                //
                if (search_freq[key] == word_freq[key]) {
                    matches += search_freq[key];
                } else {
                    //give the lowest value of matches
                    matches += (search_freq[key] < word_freq[key]) ? search_freq[key] : word_freq[key];
                    var difference = Math.abs(search_freq[key] - word_freq[key]);
                    missMatches += difference;
                }

            } else {
                missMatches++;
            }
        }
        //count missmatches if word bigger than search word
        for (var key in word_freq) {
            if (search_freq[key] == null && word_freq[key] != null) {
                missMatches++;
            }
        }
        //adding a new compare index
        var index_supplement = this.indexSuplement(word, search_word)

        var compare_index = matches / (matches + missMatches)
        //
        return compare_index + index_supplement;

    }
    indexSuplement(word, search_word) {
        if (search_word.length >= 3)
            return (search_word[0] == word[0] && search_word[1] == word[1] && search_word[2] == word[2]) ? 0.3 : -0.3
        else {
            if (search_word.length >= 2) {

                return (search_word[0] == word[0] && search_word[1] == word[1]) ? 0.2 : -0.2
            } else {
                if (search_word.length >= 1) {
                    return (search_word[0] == word[0]) ? 0.1 : -0.1
                } else {
                    return 0
                }
            }
        }




    }


}







///Old function
//supercompare(search_word, word) {
//    //first method
//    var dif = Math.abs(search_word.length - word.length);
//    var matches = 0;
//    var missMatches = 0;
//    var word_freq = {};
//    var search_freq = {}
//    var compare_lenght = Math.floor(word.length * 0.5);
//    //first method
//    for (i = 0; i < compare_lenght; i++) {
//        if (search_word[i] == word[i]) {
//            matches++;
//        }
//    }
//
//    var compare_index0 = matches / (compare_lenght);
//
//
//    //Second methods
//    matches = 0;
//    missMatches = 0;
//    for (i = 0; i < word.length; i++) {
//        //if not exists
//        if (word_freq[word[i]] == null) {
//            word_freq[word[i]] = 1;
//        } //already exists
//        else {
//            var count = word_freq[word[i]];
//            count++;
//            word_freq[word[i]] = count;
//        }
//    }
//    for (i = 0; i < search_word.length; i++) {
//        //if not exists
//        if (search_freq[search_word[i]] == null) {
//            search_freq[search_word[i]] = 1;
//        } //already exists
//        else {
//            var count = search_freq[search_word[i]];
//            count++;
//            search_freq[search_word[i]] = count;
//        }
//    }
//    //
//    matches = 0;
//    missMatches = 0;
//    for (var key in search_freq) {
//        //both have same letter
//        if (search_freq[key] != null && word_freq[key] != null) {
//
//
//            //
//            if (search_freq[key] == word_freq[key]) {
//                matches += search_freq[key];
//            } else {
//                //give the lowest value of matches
//                matches += (search_freq[key] < word_freq[key]) ? search_freq[key] : word_freq[key];
//                difference = Math.abs(search_freq[key] - word_freq[key]);
//                missMatches += difference;
//            }
//
//        } else {
//            missMatches++;
//        }
//    }
//    //count missmatches if word bigger than search word
//    for (var key in word_freq) {
//        if (search_freq[key] == null && word_freq[key] != null) {
//            missMatches++;
//        }
//    }
//    var compare_index2 = matches / (matches + missMatches);
//
//
//    var compare_index = (compare_index2 + compare_index0) / 2;
//    //
//    return compare_index;
//
//}
