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
    list_display = ('user', 'tag', 'created_at')
    date_hierarchy = 'created_at'
    list_filter = ('user', 'created_at')


admin.site.register(Tag, TagAdmin)
admin.site.register(Access_log, LogAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Place)
