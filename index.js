(function() {
  let option = false;
  $('#optSel').change('change', function(e) {
    let selOpt = $('option:selected', this);
    console.log(selOpt[0].value);
  });
  $('#inTA').bind('input propertychange', function() {
    console.log('test');
  });
})();
