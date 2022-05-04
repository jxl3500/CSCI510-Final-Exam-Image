
class Cube extends cgIShape{
    constructor(a){
        super(),this.makeCube(a)
    }
    makeCube(a){
        a<1&&(a=1);
        var d=-.5,s=-.5,t=1/a,i=0;
        for(i=0;i<a;i++){
            var h,r=i*t;
            for(h=0;h<a;h++){
                var n=h*t;
                this.addTriangle(d+n,s+r,.5,d+n+t,s+r,.5,d+n+t,s+r+t,.5),
                    this.addNormal(0,0,1,0,0,1,0,0,1),
                    this.adduv(n,r,n+t,r,n+t,r+t),
                    this.addTriangle(d+n+t,s+r+t,.5,d+n,s+r+t,.5,d+n,s+r,.5),
                    this.addNormal(0,0,1,0,0,1,0,0,1),
                    this.adduv(n+t,r+t,n,r+t,n,r),
                    this.addTriangle(d+n,s+r,-.5,d+n+t,s+r+t,-.5,d+n+t,s+r,-.5),
                    this.addNormal(0,0,-1,0,0,-1,0,0,-1),
                    this.adduv(n,r,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,s+r,-.5,d+n,s+r+t,-.5,d+n+t,s+r+t,-.5),
                    this.addNormal(0,0,-1,0,0,-1,0,0,-1),
                    this.adduv(n,r,n,r+t,n+t,r+t),
                    this.addTriangle(-.5,s+r,d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n+t),
                    this.addNormal(-1,0,0,-1,0,0,-1,0,0),
                    this.adduv(n,r,n+t,r,n+t,r+t),
                    this.addTriangle(-.5,s+r+t,d+n+t,-.5,s+r+t,d+n,-.5,s+r,d+n),
                    this.addNormal(-1,0,0,-1,0,0,-1,0,0),
                    this.adduv(n+t,r+t,n,r+t,n,r),
                    this.addTriangle(.5,s+r,d+n+t,.5,s+r,d+n,.5,s+r+t,d+n),
                    this.addNormal(1,0,0,1,0,0,1,0,0),
                    this.adduv(n+t,r,n,r,n,r+t),
                    this.addTriangle(.5,s+r+t,d+n,.5,s+r+t,d+n+t,.5,s+r,d+n+t),
                    this.addNormal(1,0,0,1,0,0,1,0,0),
                    this.adduv(n,r+t,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,.5,s+r+t,d+n+t,.5,s+r+t,d+n,.5,s+r),
                    this.addNormal(0,1,0,0,1,0,0,1,0),
                    this.adduv(n,r+t,n+t,r+t,n,r),
                    this.addTriangle(d+n,.5,s+r,d+n+t,.5,s+r+t,d+n+t,.5,s+r),
                    this.addNormal(0,1,0,0,1,0,0,1,0),
                    this.adduv(n,r,n+t,r+t,n+t,r),
                    this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r+t,d+n,-.5,s+r+t),
                    this.addNormal(0,-1,0,0,-1,0,0,-1,0),
                    this.adduv(n,r,n+t,r+t,n,r+t),
                    this.addTriangle(d+n,-.5,s+r,d+n+t,-.5,s+r,d+n+t,-.5,s+r+t),
                    this.addNormal(0,-1,0,0,-1,0,0,-1,0),
                    this.adduv(n,r,n+t,r,n+t,r+t)
            }
        }
    }
}

class Cylinder extends cgIShape{
    constructor(a,d){
        super(),this.makeCylinder(a,d)
    }
    makeCylinder(a,d){
        var s=-.5;a<3&&(a=3),d<1&&(d=1);
        var t=360/a,i=1/d;
        let h,r,n,e,o,l,M=1/a,c=1/d;
        var u,m,v=0;
        let g,N,T,C;
        for(u=0;u<a;u++)h=(g=.5*Math.cos(radians(v)))+.5,r=(N=.5*Math.sin(radians(v)))+.5,n=(T=.5*Math.cos(radians(v+t)))+.5,e=(C=.5*Math.sin(radians(v+t)))+.5,this.addTriangle(g,s,N,0,s,0,T,s,C),this.addNormal(0,-1,0,0,-1,0,0,-1,0),this.adduv(h,1-r,.5,.5,n,1-e),this.addTriangle(T,.5,C,0,.5,0,g,.5,N),this.addNormal(0,1,0,0,1,0,0,1,0),this.adduv(n,1-e,.5,.5,h,1-r),v+=t;for(l=1,u=0;u<d;u++){var f=u*i;for(v=0,o=1,m=0;m<a;m++)g=.5*Math.cos(radians(v)),N=.5*Math.sin(radians(v)),T=.5*Math.cos(radians(v+t)),C=.5*Math.sin(radians(v+t)),this.addTriangle(g,s+f,N,T,s+f,C,T,s+f+i,C),this.addNormal(g,0,N,T,0,C,T,0,C),this.adduv(o,1-l,o-M,1-l,o-M,1-(l-c)),this.addTriangle(g,s+f,N,T,s+f+i,C,g,s+f+i,N),this.addNormal(g,0,N,T,0,C,g,0,N),this.adduv(o,1-l,o-M,1-(l-c),o,1-(l-c)),v+=t,o-=M;l-=c}
    }
}

class Cone extends
    cgIShape{
    constructor(a,d){
        super(),this.makeCone(a,d)
    }
    makeCone(a,d){
        let s=-.5;a<3&&(a=3),d<1&&(d=1);let t=360/a,i=1/d;var h,r,n,e,o,l,M,c,u,m,v,g,N,T,C,f=0;let p,k,S=1/a,x=1/d,I=.5/d;for(p=0,r=0;r<a;r++)n=I*Math.cos(radians(f)),o=I*Math.sin(radians(f)),M=0,c=.5,u=0,m=e=I*Math.cos(radians(f+t)),v=.5-i,g=l=I*Math.sin(radians(f+t)),N=n,T=.5-i,C=o,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(0,0,p+S,x,p,x),n=.5*Math.cos(radians(f)),o=.5*Math.sin(radians(f)),M=0,c=s,u=0,m=e=.5*Math.cos(radians(f+t)),v=s,g=l=.5*Math.sin(radians(f+t)),N=n,T=s,C=o,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(0,-1,0,0,-1,0,0,-1,0),this.adduv(.5,.5,e+.5,1-(l+.5),n+.5,1-(o+.5)),f+=t,p+=S;for(k=1,h=0;h<d;h++){let d=h*i,n=h,e=0;for(p=0,r=0;r<a;r++){Math.cos(radians(e)),Math.sin(radians(e)),Math.cos(radians(e+t)),Math.sin(radians(e+t));let a=.5*(1-n*i),h=a*Math.cos(radians(e)),r=a*Math.sin(radians(e)),o=a*Math.cos(radians(e+t)),l=a*Math.sin(radians(e+t)),f=.5*(1-(n+1)*i),I=f*Math.cos(radians(e)),b=f*Math.sin(radians(e)),q=f*Math.cos(radians(e+t)),y=f*Math.sin(radians(e+t));a=f,M=o,c=s+d,u=l,m=I,v=s+d+i,g=b,N=h,T=s+d,C=r,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(p+S,1-k,p,1-(k-x),p,1-k),M=o,c=s+d,u=l,m=q,v=s+d+i,g=y,N=I,T=s+d+i,C=b,this.addTriangle(M,c,u,m,v,g,N,T,C),this.addConeNormal(M,c,u,m,v,g,N,T,C),this.adduv(p+S,1-k,p+S,1-(k-x),p,1-(k-x)),e+=t,p+=S
        }
        k-=x
        }
    }

    addConeNormal(a,d,s,t,i,h,r,n,e){
        let o=2*a,l=.5,M=2*s,c=Math.sqrt(o*o+l*l+M*M);o/=c,l/=c,M/=c;let u=2*t,m=.5,v=2*h,g=Math.sqrt(u*u+m*m+v*v);u/=g,m/=g,v/=g;let N=2*r,T=.5,C=2*e,f=Math.sqrt(N*N+T*T+C*C);N/=f,T/=f,C/=f,this.addNormal(o,l,M,u,m,v,N,T,C)
    }
}

class Sphere extends cgIShape{constructor(a,s){super(),this.makeSphere(a,s)}makeSphere(a,s){let i,t,r,d,h,n,e,o,l;a<3&&(a=3),s<3&&(s=3);let M=6.28/a,c=3.14/s,g=c,T=0,m=0,f=1,p=Math.sin(c),u=Math.cos(c),C=.5,k=.5*u;var v,S;for(S=0;S<a;S++){let a=Math.sin(T),s=Math.cos(T),c=Math.sin(T+M);i=0,t=.5,r=0,d=Math.cos(T+M)*p*.5,h=k,n=c*p*.5,e=s*p*.5,o=k,l=a*p*.5,this.addTriangle(i,t,r,e,o,l,d,h,n),this.addNormal(i,t,r,e,o,l,d,h,n),T+=M}for(v=1;v<s;v++){for(m=Math.sin(g),f=Math.cos(g),p=Math.sin(g+c),C=.5*f,k=.5*(u=Math.cos(g+c)),T=0,S=0;S<=a;S++){let a=Math.sin(T),s=Math.cos(T),c=Math.sin(T+M),g=Math.cos(T+M);i=s*m*.5,t=C,r=a*m*.5,d=g*m*.5,h=C,n=c*m*.5,e=s*p*.5,o=k,l=a*p*.5,this.addTriangle(e,o,l,d,h,n,i,t,r),this.addNormal(e,o,l,d,h,n,i,t,r),i=g*m*.5,t=C,r=c*m*.5,d=g*p*.5,h=k,n=c*p*.5,e=s*p*.5,o=k,l=a*p*.5,this.addTriangle(i,t,r,e,o,l,d,h,n),this.addNormal(i,t,r,e,o,l,d,h,n),T+=M}g+=c}for(T=0,m=Math.sin(g),p=0,u=-1,C=.5*(f=Math.cos(g)),k=-.5,S=0;S<a;S++){let a=Math.sin(T),s=Math.cos(T),c=Math.sin(T+M);i=s*m*.5,t=k,r=a*m*.5,d=Math.cos(T+M)*m*.5,h=k,n=c*m*.5,e=0,o=-.5,l=0,this.addTriangle(i,t,r,e,o,l,d,h,n),this.addNormal(i,t,r,e,o,l,d,h,n),T+=M}}}


class Globe extends cgIShape{
    constructor(a,d){
        super(),this.makeSphere(a,d)
    }

    makeSphere(a,d){
        let s,t,i,h,r,n,e,o,l,M,c,u,m,v,g;a<3&&(a=3),d<3&&(d=3);
        let N=6.28/a,T=3.14/d,C=1/a,f=1/d,p=T,k=0,S=0,x=1,I=0,b=0,q=Math.sin(T),y=Math.cos(T),j=.5,w=.5*y;
        var z,A;
        for(I=1,A=0;A<a;A++){
            b=0;
            let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N);s=0,t=.5,i=0,M=0,c=0,n=Math.cos(k+N)*q*.5,r=w,h=T*q*.5,u=I-C,m=b+f,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(M,c,v,g,u,m),k+=N,I-=C}for(b=f,z=1;z<d;z++){for(S=Math.sin(p),x=Math.cos(p),q=Math.sin(p+T),j=.5*x,w=.5*(y=Math.cos(p+T)),k=0,I=1,A=0;A<=a;A++){let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N),p=Math.cos(k+N);i=d*S*.5,t=j,s=a*S*.5,M=I,c=b,n=p*S*.5,r=j,h=T*S*.5,u=I-C,m=b,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(e,o,l,h,r,n,s,t,i),this.addNormal(e,o,l,h,r,n,s,t,i),this.adduv(1-v,1-g,1-u,1-m,1-M,1-c),i=p*S*.5,t=j,s=T*S*.5,M=I-C,c=b,n=p*q*.5,r=w,h=T*q*.5,u=I-C,m=b+f,l=d*q*.5,o=w,e=a*q*.5,v=I,g=b+f,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(1-M,1-c,1-v,1-g,1-u,1-m),k+=N,I-=C}p+=T,b+=f}for(I=1,b=1,k=0,S=Math.sin(p),q=0,y=-1,j=.5*(x=Math.cos(p)),w=-.5,A=0;A<a;A++){let a=Math.sin(k),d=Math.cos(k),T=Math.sin(k+N);i=d*S*.5,t=w,s=a*S*.5,M=I,c=b,n=Math.cos(k+N)*S*.5,r=w,h=T*S*.5,u=I-C,m=b,l=0,o=-.5,e=0,v=1,g=1,this.addTriangle(s,t,i,e,o,l,h,r,n),this.addNormal(s,t,i,e,o,l,h,r,n),this.adduv(M,c,v,g,u,m),k+=N,I-=C}
    }
}



