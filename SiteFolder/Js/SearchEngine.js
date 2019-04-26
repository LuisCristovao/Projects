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
        return window.location.search.split("=")[1].split("+")
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
        for (var i in all_posts) {
            var post = all_posts[i]
            var post_tags = this.arrayUpperCase(post['search tags'].split(","))
            post_tags = post_tags.concat(this.arrayUpperCase(post['secondary search tags'].split(",")))
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
        var suggestion = suggestion_div.innerText
        var search_input = document.getElementById("search_input")
        search_input.value = suggestion
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
            }
        } else {


            if (suggestions.length > 0) {
                var body = document.body
                var width = input.offsetWidth
                var top = input.offsetTop
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
    selectSuggestionAction(suggestion){
        let search_input=document.getElementById("search_input")
        let val=search_input.value
        let actual_tags=val.split(" ")
        
        this.highLight(suggestion)
        
        if(val.split(" ").length>1){
            actual_tags[actual_tags.length-1]=suggestion.innerText
            let input_val=""
            actual_tags=actual_tags.filter(el=>el!=" " && el!="")
            for(let i=0;i<actual_tags.length;i++){
                let el=actual_tags[i]
                if(i==0){
                    input_val+=el
                }else{
                    input_val+=" "+el
                }
            }
            search_input.value=input_val
        }else{
            search_input.value=suggestion.innerText
        }
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
                    this.selectSuggestionAction(suggestions.children[0].children[this.circularIndexCalc(i+1,Length)])
                } else {
                    //up
                    this.selectSuggestionAction(suggestions.children[0].children[this.circularIndexCalc(i-1,Length)])
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
        if (search_query != "") {

            //for(var i =0 ;i<search_query_tags.length;i++,compare_index=0.5){
            //var search_query=search_query_tags[i]
            var first_letter = search_query[0].toUpperCase()
            while (suggestions.length == 0 && compare_index >= 0) {

                for (var key in this.tagsdb[first_letter]) {
                    if (this.supercompare(search_query.toUpperCase(), key.toUpperCase()) > compare_index) {
                        suggestions.push(key)
                    }
                    //just test version
                    //suggestions.push(key)
                }
                if (suggestions.length <= 3) {
                    compare_index -= 0.1
                } else {
                    compare_index += 0.1
                }
            }
            final_suggestions = final_suggestions.concat(suggestions)
            suggestions = []
        }
        //}
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
        var compare_index = matches / (matches + missMatches)
        //
        return compare_index;

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
