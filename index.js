(function() {
  const characterString = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const cArr = characterString.split('');
  let option = false;
  
  function sRot(input) {
    let iArr = input.split('');
    let oArr = iArr.map(function(e) {
      let eI = cArr.indexOf(e);
      if(eI < 0) return e;
      return cArr[(eI + cArr.length/2) % cArr.length];
    }
    return oArr.join('');
  }
  
  function obfuscate(input) {
    input = sRot(input);
    return input;
  }
  
  function reveal(input) {
    input = sRot(input);
    return input;
  }
  
  function modify(input) {
    $('#outTA').value = option ? reveal(input) : obfuscate(input);
  }
  
  $('#optSel').change('change', function(e) {
    let selOpt = $('option:selected', this);
    option = selOpt[0].value === 'reveal';
    modify($('#inTA').value);
  });
  $('#inTA').bind('input propertychange', function(e) {
    modify(this.value);
  });
})();
