from django.db import models


class User(models.Model):
    name = models.CharField('nome', max_length=255)
    email = models.CharField('email', max_length=255)
    created_at = models.DateTimeField('criado em', auto_now_add=True)
    updated_at = models.DateTimeField('atualizado em', auto_now=True)

    class Meta:
        verbose_name = 'usuário'
        verbose_name_plural = 'usuário'

    def __str__(self):
        return self.name


class Place(models.Model):
    name = models.CharField('nome', max_length=100)

    class Meta:
        verbose_name = 'local'
        verbose_name_plural = 'locais'

    def __str__(self):
        return self.name


class Tag(models.Model):
    tag = models.CharField('tag', max_length=8)
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='usuário')
    state = models.SmallIntegerField('status')
    created_at = models.DateTimeField('criado em', auto_now_add=True)
    updated_at = models.DateTimeField('atualizado em', auto_now=True)
    places = models.ManyToManyField('Place', verbose_name='locais', blank=True)

    class Meta:
        verbose_name = 'tag'
        verbose_name_plural = 'tags'

    def __str__(self):
        return self.tag


class Access_log(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='usuário')
    tag = models.ForeignKey('Tag', on_delete=models.CASCADE, verbose_name='tag')
    place = models.ForeignKey('Place', on_delete=models.CASCADE, verbose_name='local')
    status = models.SmallIntegerField('status')
    created_at = models.DateTimeField('criado em', auto_now_add=True, null=True)
    updated_at = models.DateTimeField('atualizado em', auto_now=True, blank=True)
    access_type = models.SmallIntegerField('tipo', default=1, null=True, blank=True)

    class Meta:
        verbose_name = 'log'
        verbose_name_plural = 'logs'

    def __str__(self):
        return str(self.id)
