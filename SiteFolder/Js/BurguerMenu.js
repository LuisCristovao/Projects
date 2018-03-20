i = setInterval ->
  $("burguer").toggleClass "cross"
, 1500

$("burguer").click ->
  clearInterval i
  $("div").toggleClass "cross"

resize = ->
  $("body").css
    "margin-top": ~~((window.innerHeight - 150) / 2) + "px"
    
$(window).resize resize
resize()
