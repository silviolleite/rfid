from django.contrib import admin

from rfid.core.models import Tag, Access_log, User, Place

admin.site.site_header = 'Sistema de Controle RFID'
admin.site.site_title = "Painel Administrativo"
admin.site.index_title = "Bem vindo ao sistema de controle RFID"


class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email')


class TagAdmin(admin.ModelAdmin):
    filter_horizontal = ['places']
    list_display = ('tag', 'user', 'created_at', 'updated_at', 'active', 'locais')

    def active(self, obj):
        return obj.state == 1

    def locais(self, obj):
        return '  |  '.join([other.name for other in obj.places.all()])

    active.short_description = 'Status'
    active.boolean = True


class LogAdmin(admin.ModelAdmin):
    list_display = ('user', 'tag', 'place', 'created_at', 'status_text', 'access')
    date_hierarchy = 'created_at'
    list_filter = ('user', 'created_at')

    def status_text(self, obj):
        if obj.status == 1:
            return 'Acesso Permitido'
        return 'Acesso Negado'

    status_text.short_description = 'Status'
    
    def access(self, obj):
        if obj.access_type == 1:
            return 'Entrada'
        return 'Saída'

    status_text.short_description = 'Status'


class PlaceAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    ordering = ('id',)


admin.site.register(Tag, TagAdmin)
admin.site.register(Access_log, LogAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Place, PlaceAdmin)
