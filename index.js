(function() {
  let option = false;
  $('#optSel').change('change', function(e) {
    let selOpt = $('option:selected', this).value;
    console.log(selOpt);
  });
  $('#inTA').bind('input propertychange', function() {
    console.log('test');
  });
})();
