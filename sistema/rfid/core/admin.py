from django.contrib import admin
from django.utils.timezone import now

from rfid.core.models import Tag, Access_log, User


class UserAdmin(admin.ModelAdmin):
  list_display = ('name', 'email')


class TagAdmin(admin.ModelAdmin):
  list_display = ('tag', 'user', 'created_at', 'updated_at', 'active')

  def active(self, obj):
    return obj.state == 1

  active.short_description = 'Status'
  active.boolean = True


class LogAdmin(admin.ModelAdmin):
  list_display = ('user', 'tag', 'created_at')
  date_hierarchy = 'created_at'
  list_filter = ('user', 'created_at')


admin.site.register(Tag, TagAdmin)
admin.site.register(Access_log, LogAdmin)
admin.site.register(User, UserAdmin)
