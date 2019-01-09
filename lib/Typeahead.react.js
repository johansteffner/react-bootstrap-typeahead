'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ClearButton = require('./ClearButton.react');

var _ClearButton2 = _interopRequireDefault(_ClearButton);

var _Loader = require('./Loader.react');

var _Loader2 = _interopRequireDefault(_Loader);

var _Overlay = require('./Overlay.react');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _TypeaheadInputMulti = require('./TypeaheadInputMulti.react');

var _TypeaheadInputMulti2 = _interopRequireDefault(_TypeaheadInputMulti);

var _TypeaheadInputSingle = require('./TypeaheadInputSingle.react');

var _TypeaheadInputSingle2 = _interopRequireDefault(_TypeaheadInputSingle);

var _TypeaheadMenu = require('./TypeaheadMenu.react');

var _TypeaheadMenu2 = _interopRequireDefault(_TypeaheadMenu);

var _typeaheadContainer = require('./containers/typeaheadContainer');

var _typeaheadContainer2 = _interopRequireDefault(_typeaheadContainer);

var _utils = require('./utils/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Typeahead = function (_React$Component) {
  _inherits(Typeahead, _React$Component);

  function Typeahead(props) {
    _classCallCheck(this, Typeahead);

    var _this = _possibleConstructorReturn(this, (Typeahead.__proto__ || Object.getPrototypeOf(Typeahead)).call(this, props));

    _this._renderInput = function (inputProps) {
      var Input = inputProps.multiple ? _TypeaheadInputMulti2.default : _TypeaheadInputSingle2.default;

      return _react2.default.createElement(Input, inputProps);
    };

    _this._renderAux = function () {
      var _this$props = _this.props,
          bsSize = _this$props.bsSize,
          clearButton = _this$props.clearButton,
          disabled = _this$props.disabled,
          isLoading = _this$props.isLoading,
          onClear = _this$props.onClear,
          selected = _this$props.selected;


      var content = void 0;

      if (isLoading) {
        content = _react2.default.createElement(_Loader2.default, { bsSize: bsSize });
      } else if (clearButton && !disabled && selected.length) {
        content = _react2.default.createElement(_ClearButton2.default, {
          bsSize: bsSize,
          onClick: onClear,
          onFocus: function onFocus(e) {
            // Prevent the main input from auto-focusing again.
            e.stopPropagation();
          },
          onMouseDown: _utils.preventInputBlur
        });
      }

      return content ? _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rbt-aux', {
            'rbt-aux-lg': bsSize === 'large' || bsSize === 'lg'
          }) },
        content
      ) : null;
    };

    _this.referenceElement = _react2.default.createRef();
    return _this;
  }

  _createClass(Typeahead, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var allowNew = nextProps.allowNew,
          onInitialItemChange = nextProps.onInitialItemChange,
          results = nextProps.results;

      // Clear the initial item when there are no results.

      if (!(allowNew || results.length)) {
        onInitialItemChange(null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          bodyContainer = _props.bodyContainer,
          children = _props.children,
          className = _props.className,
          isMenuShown = _props.isMenuShown,
          menuId = _props.menuId,
          renderMenu = _props.renderMenu,
          results = _props.results;


      var inputProps = (0, _pick2.default)(this.props, ['activeIndex', 'activeItem', 'bsSize', 'disabled', 'initialItem', 'inputProps', 'inputRef', 'isInvalid', 'isMenuShown', 'isValid', 'labelKey', 'menuId', 'multiple', 'onAdd', 'onBlur', 'onChange', 'onFocus', 'onKeyDown', 'onRemove', 'placeholder', 'renderToken', 'selected', 'selectHintOnEnter', 'text']);

      var overlayProps = (0, _pick2.default)(this.props, ['align', 'className', 'dropup', 'flip', 'onMenuHide', 'onMenuShow']);

      var menuProps = (0, _pick2.default)(this.props, ['emptyLabel', 'labelKey', 'maxHeight', 'newSelectionPrefix', 'renderMenuItemChildren', 'text']);

      var auxContent = this._renderAux();

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('rbt', 'clearfix', 'open', {
            'has-aux': !!auxContent
          }, className),
          style: { position: 'relative' },
          tabIndex: -1 },
        this._renderInput(_extends({}, inputProps, {
          ref: this.referenceElement
        })),
        typeof children === 'function' ? children(this.props) : children,
        auxContent,
        _react2.default.createElement(
          _Overlay2.default,
          _extends({}, overlayProps, {
            container: bodyContainer ? document.body : this,
            referenceElement: this.referenceElement.current,
            show: isMenuShown }),
          renderMenu(results, _extends({}, menuProps, { id: menuId }))
        ),
        _react2.default.createElement(
          'div',
          {
            'aria-atomic': true,
            'aria-live': 'polite',
            className: 'sr-only rbt-sr-status',
            role: 'status' },
          (0, _utils.getAccessibilityStatus)(this.props)
        )
      );
    }
  }]);

  return Typeahead;
}(_react2.default.Component);

Typeahead.propTypes = {
  renderMenu: _propTypes2.default.func
};

Typeahead.defaultProps = {
  renderMenu: function renderMenu(results, menuProps) {
    return _react2.default.createElement(_TypeaheadMenu2.default, _extends({}, menuProps, { options: results }));
  }
};

exports.default = (0, _typeaheadContainer2.default)(Typeahead);