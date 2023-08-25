export function getNumericCellEditor() {
    function isCharNumeric(charStr: any) {
      return !!/\d/.test(charStr);
    }
    function isKeyPressedNumeric(event: any) {
      const charCode = getCharCodeFromEvent(event);
      const charStr = String.fromCharCode(charCode);
      return isCharNumeric(charStr);
    }
    function getCharCodeFromEvent(event: any) {
      event = event || window.event;
      return typeof event.which === 'undefined' ? event.keyCode : event.which;
    }
    function NumericCellEditor() { }
    NumericCellEditor.prototype.init = function (params: any) {
      this.focusAfterAttached = params.cellStartedEdit;
      this.eInput = document.createElement('input');
      this.eInput.type = 'text';
      this.eInput.name = params.colDef.field;
      this.eInput.id = params.rowIndex;
      this.eInput.className = 'w-100';
      // this.eInput.value = isCharNumeric(params.charPress)
      //   ? params.charPress
      //   : params.value;
      const that = this;
      this.eInput.addEventListener('keypress', function (event: any) {
        // if (!isKeyPressedNumeric(event)) {
        //   that.eInput.focus();
        //   if (event.preventDefault) { event.preventDefault(); }
        // }
      });
    };
    NumericCellEditor.prototype.getGui = function () {
      return this.eInput;
    };
    NumericCellEditor.prototype.afterGuiAttached = function () {
      if (this.focusAfterAttached) {
        this.eInput.focus();
        this.eInput.select();
      }
    };
    NumericCellEditor.prototype.isCancelBeforeStart = function () {
      return this.cancelBeforeStart;
    };
    NumericCellEditor.prototype.isCancelAfterEnd = function () { };
    NumericCellEditor.prototype.getValue = function () {
      return this.eInput.value;
    };
    NumericCellEditor.prototype.focusIn = function () {
      const eInput = this.getGui();
      eInput.focus();
      eInput.select();
      console.log('NumericCellEditor.focusIn()');
    };
    NumericCellEditor.prototype.focusOut = function () {
      console.log('NumericCellEditor.focusOut()');
    };
    return NumericCellEditor;
  }

