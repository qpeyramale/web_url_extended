openerp.web_url_extended = function(instance) {

var QWeb = instance.web.qweb,
    _t = instance.web._t;

instance.web.ListView.List = instance.web.ListView.List.extend({
    render: function () {
        var self = this;
        this.$current.empty().append(
            QWeb.render('ListView.rows', _.extend({
                    render_cell: function () {
                        return self.render_cell.apply(self, arguments); }
                }, this)));
        this.records.each(function(record){
            var $row = self.$current.find('[data-id=' + record.get('id') + ']');
            for(var i=0, length=self.columns.length; i<length; ++i) {
            //alert(self.columns[i].name);
        if(self.columns[i].widget === 'url') {
                    var $cell = $row.find((_.str.sprintf('[data-field=%s]', self.columns[i].id)));
                    console.log('coyucou');
                    console.log(record.get(self.columns[i].id).replace(/[^0-9\.]+/g, ''));
                    $cell.html(_.template('<a class="oe_form_uri link_view_sdk" href="<%-text%>" target="blank" data-model="<%-model%>" data-id="<%-id%>"><%-mytxt%></a>',  {
                        text: instance.web.format_value(record.get(self.columns[i].id), self.columns[i], ''),
                        model: self.columns[i].relation,
                        id: record.get(self.columns[i].id)[0],
                        mytxt:record.get(self.columns[i].id).replace(/[^0-9\.]+/g, ''),
                        }))
                }
            }
        });
        this.pad_table_to(4);
    }
});

 
instance.web.form.One2ManyList = instance.web.form.One2ManyList.extend({
    render: function () {
        var self = this;
        this.$current.empty().append(
            QWeb.render('ListView.rows', _.extend({
                    render_cell: function () {
                        return self.render_cell.apply(self, arguments); }
                }, this)));
        this.records.each(function(record){
            var $row = self.$current.find('[data-id=' + record.get('id') + ']');
            for(var i=0, length=self.columns.length; i<length; ++i) {
                if(self.columns[i].widget === 'url') {
                    var $cell = $row.find((_.str.sprintf('[data-field=%s]', self.columns[i].id)));
                    $cell.html(_.template('<a class="oe_form_uri link_view_sdk" href="<%-text%>" target="blank" data-model="<%-model%>" data-id="<%-id%>"><%-mytxt%></a>', {
                        text: instance.web.format_value(record.get(self.columns[i].id), self.columns[i], ''),
                        model: self.columns[i].relation,
                        id: record.get(self.columns[i].id)[0],
            mytxt:self.columns[i].string,
                        }))
                }
            }
        });
        this.pad_table_to(4);
    }
  }); 
};
