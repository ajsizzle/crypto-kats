var colors = Object.values(allColors());

var defaultDNA = {
  headcolor: 10,
  mouthColor: 13,
  eyesColor: 24,
  earsColor: 10,
  //Cattributes
  eyesShape: 1,
  decorationPattern: 1,
  decorationMidcolor: 13,
  decorationSidescolor: 13,
  animation: 1,
  lastNum: 1,
};

// when page load
$(document).ready(function () {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);

  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnadecoration').html(defaultDNA.decorationPattern);
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor);
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor);
  $('#dnaanimation').html(defaultDNA.animation);
  $('#dnaspecial').html(defaultDNA.lastNum);

  renderCat(defaultDNA);
});

function defaultCat() {
  renderCat(defaultDNA);
}

function randomDNA() {
  var dnaStr = String(Math.floor(Math.random() * 1e16));
  //Colors
  var dna = {
    headcolor: dnaStr.substring(0, 2),
    mouthColor: dnaStr.substring(2, 4),
    eyesColor: dnaStr.substring(4, 6),
    earsColor: dnaStr.substring(6, 8),
    //Cattributes
    eyesShape: (dnaStr.substring(8, 9) % 3) + 1,
    decorationPattern: (dnaStr.substring(9, 10) % 7) + 1,
    decorationMidcolor: dnaStr.substring(10, 12),
    decorationSidescolor: dnaStr.substring(12, 14),
    animation: (dnaStr.substring(14, 15) % 4) + 1,
    lastNum: dnaStr.substring(15, 16),
  };

  return dna;
}

//Random cat DNA
function randomCat() {
  var dna = randomDNA();

  renderCat(dna);
}

function getDna() {
  var dna = '';
  dna += $('#dnabody').html();
  dna += $('#dnamouth').html();
  dna += $('#dnaeyes').html();
  dna += $('#dnaears').html();
  dna += $('#dnashape').html();
  dna += $('#dnadecoration').html();
  dna += $('#dnadecorationMid').html();
  dna += $('#dnadecorationSides').html();
  dna += $('#dnaanimation').html();
  dna += $('#dnaspecial').html();

  return parseInt(dna);
}

function renderCat(dna) {
  headColor(colors[dna.headcolor], dna.headcolor);
  $('#bodycolor').val(dna.headcolor);

  mouthColor(colors[dna.mouthColor], dna.mouthColor);
  $('#mouthColor').val(dna.mouthColor);

  eyesColor(colors[dna.eyesColor], dna.eyesColor);
  $('#eyesColor').val(dna.eyesColor);

  earsColor(colors[dna.earsColor], dna.earsColor);
  $('#earsColor').val(dna.earsColor);

  eyeVariation(dna.eyesShape);
  $('#eyeShape').val(dna.eyesShape);

  decorationVariation(dna.decorationPattern);
  $('#hairStyle').val(dna.decorationPattern);

  decorationMidcolor(colors[dna.decorationMidcolor], dna.decorationMidcolor);
  $('#decorationMidcolor').val(dna.decorationMidcolor);

  decorationSidescolor(
    colors[dna.decorationSidescolor],
    dna.decorationSidescolor
  );
  $('#decorationSidescolor').val(dna.decorationSidescolor);

  animationVariation(dna.animation);
  $('#animation').val(dna.animation);
}

// Changing cat colors
$('#bodycolor').change(() => {
  var colorVal = $('#bodycolor').val();
  headColor(colors[colorVal], colorVal);
});

$('#mouthColor').change(() => {
  var colorVal = $('#mouthColor').val();
  mouthColor(colors[colorVal], colorVal);
});

$('#eyesColor').change(() => {
  var colorVal = $('#eyesColor').val();
  eyesColor(colors[colorVal], colorVal);
});

$('#earsColor').change(() => {
  var colorVal = $('#earsColor').val();
  earsColor(colors[colorVal], colorVal);
});

$('#decorationMidcolor').change(() => {
  var colorVal = $('#decorationMidcolor').val();
  decorationMidcolor(colors[colorVal], colorVal);
});

$('#decorationSidescolor').change(() => {
  var colorVal = $('#decorationSidescolor').val();
  decorationSidescolor(colors[colorVal], colorVal);
});

// Changing eye shape
$('#eyeShape').change(() => {
  var shape = parseInt($('#eyeShape').val());
  eyeVariation(shape);
});

// Changing hair style
$('#hairStyle').change(() => {
  var hair = parseInt($('#hairStyle').val());
  decorationVariation(hair);
});

// Changing animations
$('#animation').change(() => {
  var animationVal = parseInt($('#animation').val());
  animationVariation(animationVal);
});

function showColors() {
  $('#catColors').removeClass('hidden');
  $('#cattributes').addClass('hidden');
}

function showCattributes() {
  $('#cattributes').removeClass('hidden');
  $('#catColors').addClass('hidden');
}
