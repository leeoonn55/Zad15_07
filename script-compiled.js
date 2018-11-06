'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StopWatch = function (_React$Component) {
	_inherits(StopWatch, _React$Component);

	function StopWatch(props) {
		_classCallCheck(this, StopWatch);

		var _this = _possibleConstructorReturn(this, (StopWatch.__proto__ || Object.getPrototypeOf(StopWatch)).call(this, props));

		_this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			},
			history: []
		};

		return _this;
	}

	_createClass(StopWatch, [{
		key: 'reset',
		value: function reset() {
			this.setState({
				times: {
					minutes: 0,
					seconds: 0,
					miliseconds: 0
				}
			});
		}
	}, {
		key: 'pad0',
		value: function pad0(value) {
			var result = value.toString();
			var resultLength = result.length;
			if (resultLength < 2) {
				result = 0 + result;
			}
			return result;
		}
	}, {
		key: 'format',
		value: function format() {
			var minutes = this.state.times.minutes;
			var seconds = this.state.times.seconds;
			var miliseconds = this.state.times.miliseconds;
			return this.pad0(minutes) + ':' + this.pad0(seconds) + ':' + this.pad0(Math.floor(miliseconds));
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.state.running) {
				this.state.running = 'true';
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.state.running) return;
			this.calculate();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			this.setState({
				times: {
					minutes: this.state.times.minutes,
					seconds: this.state.times.seconds,
					miliseconds: this.state.times.miliseconds + 1
				}
			});

			if (this.state.times.miliseconds >= 100) {
				this.setState({
					times: {
						minutes: this.state.times.minutes,
						seconds: this.state.times.seconds + 1,
						miliseconds: 0
					}
				});
			}

			if (this.state.times.seconds >= 60) {
				this.setState({
					times: {
						minutes: this.state.times.minutes + 1,
						seconds: 0,
						miliseconds: this.state.times.miliseconds
					}
				});
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.setState({
				running: false
			});
			this.addTime();

			this.reset();
			clearInterval(this.watch);
		}
	}, {
		key: 'addTime',
		value: function addTime() {
			var newRecord = {
				id: this.state.history.length,
				record: this.format()
			};

			this.setState({ history: [].concat(_toConsumableArray(this.state.history), [newRecord]) });
			console.log(this.state.history);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			return React.createElement(
				'div',
				{ className: 'container' },
				React.createElement(
					'div',
					{ className: 'tab-panel active', id: 'tab1' },
					React.createElement(
						'nav',
						null,
						React.createElement(
							'a',
							{ href: '#', className: 'button', id: 'start', onClick: function onClick() {
									return _this3.start();
								} },
							'start '
						),
						React.createElement(
							'a',
							{ href: '#', className: 'button', id: 'stop', onClick: function onClick() {
									_this3.stop();
								} },
							' stop '
						)
					),
					React.createElement(Display, { time: this.format() })
				),
				React.createElement(Results, { history: this.state.history, className: 'tab-panel', id: 'tab2' })
			);
		}
	}]);

	return StopWatch;
}(React.Component);

var Display = function (_React$Component2) {
	_inherits(Display, _React$Component2);

	function Display(props) {
		_classCallCheck(this, Display);

		return _possibleConstructorReturn(this, (Display.__proto__ || Object.getPrototypeOf(Display)).call(this, props));
	}

	_createClass(Display, [{
		key: 'render',
		value: function render() {
			return React.createElement('div', { className: 'stopWatch' }, this.props.time);
		}
	}], [{
		key: 'propTypes',
		value: function propTypes() {
			time: React.PropTypes.string.isRequired;
		}
	}]);

	return Display;
}(React.Component);

var Results = function (_React$Component3) {
	_inherits(Results, _React$Component3);

	function Results(props) {
		_classCallCheck(this, Results);

		return _possibleConstructorReturn(this, (Results.__proto__ || Object.getPrototypeOf(Results)).call(this, props));
	}

	_createClass(Results, [{
		key: 'render',
		value: function render() {
			var results = this.props.history.map(function (ele) {
				return React.createElement('li', { key: ele.id }, ele.record);
			});
			return React.createElement('ol', { className: 'results' }, React.createElement('p', {}, "Results"), results);
		}
	}], [{
		key: 'propTypes',
		value: function propTypes() {

			history: React.PropTypes.array.isRequired;
		}
	}]);

	return Results;
}(React.Component);

var element = React.createElement(StopWatch);

ReactDOM.render(element, document.getElementById('app'));
