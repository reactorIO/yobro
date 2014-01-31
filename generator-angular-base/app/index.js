'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AngularBaseGenerator = module.exports = function AngularBaseGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AngularBaseGenerator, yeoman.generators.Base);

AngularBaseGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

    var prompts = [{
        type: 'confirm',
        name: 'someOption',
        message: 'Yo bro! Would you like to enable this option?',
        default: true
    },
    {
        name: 'moduleName',
        message: 'What do you want to name this awesome app/site?'
    },
    {
        name: 'authorName',
        message: 'What is your name?',
        default: "Evo"
    },
    {
        name: "authorURL",
        message: "What is the site where the author can be reached?",
        default: "http://reactorio.github.io"
    },
    {
        name: "description",
        message: "Give me a description for your app/site",
        default: "A sample description"
    },

  ];

  this.prompt(prompts, function (props) {

    this.someOption = props.someOption;
    this.moduleName = props.moduleName;
    this.authorName = props.authorName;
    this.authorURL = props.authorURL;
    this.description = props.description;

    cb();
  }.bind(this));
};

AngularBaseGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

AngularBaseGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
