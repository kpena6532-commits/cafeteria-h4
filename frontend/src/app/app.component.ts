import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, Storefront, Product } from './services/api.service';

@Component({selector:'app-root', standalone:true, imports:[CommonModule,FormsModule], templateUrl:'./app.component.html'})
export class AppComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);
  private refreshTimer?: ReturnType<typeof setInterval>;
  data = signal<Storefront|null>(null);
  loading = signal(true);
  error = signal('');
  category = signal(0);
  menuOpen = signal(false);
  chatOpen = signal(false);
  chatBusy = signal(false);
  question = '';
  conversation = signal<{from:'user'|'bot';text:string}[]>([]);
  contactBusy = signal(false);
  contactStatus = signal('');
  form = { nombre:'',email:'',asunto:'',mensaje:'' };
  products = computed(() => (this.data()?.productos || []).filter(p => p.disponible && (!this.category() || p.categoria_id === this.category())));
  specialties = computed(() => (this.data()?.especialidades || []).map(s => ({...s, producto:this.data()?.productos.find(p => p.id === s.producto_id)})).filter(s => s.producto?.disponible));
  ngOnInit() {
    this.refresh();
    // Detecta modificaciones hechas directamente en MySQL sin recompilar ni recargar.
    this.refreshTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.api.load().subscribe({ next: d => {
          this.data.set(d);
          document.title = d.configuracion['nombre'] || 'Cafetería';
        }, error: () => {} });
      }
    }, 15000);
  }
  ngOnDestroy() { if (this.refreshTimer) clearInterval(this.refreshTimer); }
  refresh() {this.loading.set(true);this.api.load().subscribe({next:d=>{this.data.set(d);this.loading.set(false);document.title=d.configuracion['nombre'] || 'Cafetería';},error:()=>{this.loading.set(false);this.error.set('No se pudo cargar la información de MySQL. Verifica el backend y la base de datos.');}});}
  c(key:string) { return this.data()?.configuracion[key] || ''; }
  closeMenu() { this.menuOpen.set(false); }
  sendContact() { if(this.contactBusy())return;this.contactBusy.set(true);this.contactStatus.set('');this.api.contact(this.form).subscribe({next:r=>{this.contactStatus.set(r.mensaje);this.form={nombre:'',email:'',asunto:'',mensaje:''};this.contactBusy.set(false);},error:e=>{this.contactStatus.set(e.error?.error || 'No se pudo enviar el mensaje.');this.contactBusy.set(false);}}); }
  sendChat() {const prompt=this.question.trim();if(!prompt || this.chatBusy())return;this.question='';this.conversation.update(a=>[...a,{from:'user',text:prompt}]);this.chatBusy.set(true);this.api.chat(prompt).subscribe({next:r=>{this.conversation.update(a=>[...a,{from:'bot',text:r.response}]);this.chatBusy.set(false);},error:e=>{this.conversation.update(a=>[...a,{from:'bot',text:e.error?.error || 'El asistente no está disponible. Inténtalo más tarde.'}]);this.chatBusy.set(false);}});}
  formatPrice(p:Product) {return Number(p.precio).toFixed(2);}
}
