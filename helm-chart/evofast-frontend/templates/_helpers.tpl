{{- define "evofast-frontend.name" -}}
evofast-frontend
{{- end -}}

{{- define "evofast-frontend.fullname" -}}
{{- printf "%s" (include "evofast-frontend.name" .) -}}
{{- end -}}
