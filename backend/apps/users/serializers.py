from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret["dispatch_id"] = 12345678
        return ret

    class Meta:
        model = User
        fields = ('id', 'phone', 'type', 'region')
