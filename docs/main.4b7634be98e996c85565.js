(self.webpackChunkchauhantraders = self.webpackChunkchauhantraders || []).push([
  [179],
  {
    255: (hi) => {
      function Gn(pi) {
        return Promise.resolve().then(() => {
          var In = new Error("Cannot find module '" + pi + "'");
          throw ((In.code = "MODULE_NOT_FOUND"), In);
        });
      }
      (Gn.keys = () => []), (Gn.resolve = Gn), (Gn.id = 255), (hi.exports = Gn);
    },
    535: (hi, Gn, pi) => {
      "use strict";
      function In(t) {
        return "function" == typeof t;
      }
      let hu = !1;
      const $t = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const e = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                e.stack
            );
          } else
            hu &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          hu = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return hu;
        },
      };
      function es(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const Lo = {
          closed: !0,
          next(t) {},
          error(t) {
            if ($t.useDeprecatedSynchronousErrorHandling) throw t;
            es(t);
          },
          complete() {},
        },
        Kh = Array.isArray || ((t) => t && "number" == typeof t.length);
      function Zh(t) {
        return null !== t && "object" == typeof t;
      }
      const Vo = (() => {
        function t(e) {
          return (
            Error.call(this),
            (this.message = e
              ? `${e.length} errors occurred during unsubscription:\n${e
                  .map((n, r) => `${r + 1}) ${n.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = e),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class De {
        constructor(e) {
          (this.closed = !1),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            e && ((this._ctorUnsubscribe = !0), (this._unsubscribe = e));
        }
        unsubscribe() {
          let e;
          if (this.closed) return;
          let {
            _parentOrParents: n,
            _ctorUnsubscribe: r,
            _unsubscribe: s,
            _subscriptions: i,
          } = this;
          if (
            ((this.closed = !0),
            (this._parentOrParents = null),
            (this._subscriptions = null),
            n instanceof De)
          )
            n.remove(this);
          else if (null !== n)
            for (let o = 0; o < n.length; ++o) n[o].remove(this);
          if (In(s)) {
            r && (this._unsubscribe = void 0);
            try {
              s.call(this);
            } catch (o) {
              e = o instanceof Vo ? Yh(o.errors) : [o];
            }
          }
          if (Kh(i)) {
            let o = -1,
              a = i.length;
            for (; ++o < a; ) {
              const l = i[o];
              if (Zh(l))
                try {
                  l.unsubscribe();
                } catch (u) {
                  (e = e || []),
                    u instanceof Vo ? (e = e.concat(Yh(u.errors))) : e.push(u);
                }
            }
          }
          if (e) throw new Vo(e);
        }
        add(e) {
          let n = e;
          if (!e) return De.EMPTY;
          switch (typeof e) {
            case "function":
              n = new De(e);
            case "object":
              if (n === this || n.closed || "function" != typeof n.unsubscribe)
                return n;
              if (this.closed) return n.unsubscribe(), n;
              if (!(n instanceof De)) {
                const i = n;
                (n = new De()), (n._subscriptions = [i]);
              }
              break;
            default:
              throw new Error(
                "unrecognized teardown " + e + " added to Subscription."
              );
          }
          let { _parentOrParents: r } = n;
          if (null === r) n._parentOrParents = this;
          else if (r instanceof De) {
            if (r === this) return n;
            n._parentOrParents = [r, this];
          } else {
            if (-1 !== r.indexOf(this)) return n;
            r.push(this);
          }
          const s = this._subscriptions;
          return null === s ? (this._subscriptions = [n]) : s.push(n), n;
        }
        remove(e) {
          const n = this._subscriptions;
          if (n) {
            const r = n.indexOf(e);
            -1 !== r && n.splice(r, 1);
          }
        }
      }
      var t;
      function Yh(t) {
        return t.reduce((e, n) => e.concat(n instanceof Vo ? n.errors : n), []);
      }
      De.EMPTY = (((t = new De()).closed = !0), t);
      const jo =
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random();
      class me extends De {
        constructor(e, n, r) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = Lo;
              break;
            case 1:
              if (!e) {
                this.destination = Lo;
                break;
              }
              if ("object" == typeof e) {
                e instanceof me
                  ? ((this.syncErrorThrowable = e.syncErrorThrowable),
                    (this.destination = e),
                    e.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new Jh(this, e)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new Jh(this, e, n, r));
          }
        }
        [jo]() {
          return this;
        }
        static create(e, n, r) {
          const s = new me(e, n, r);
          return (s.syncErrorThrowable = !1), s;
        }
        next(e) {
          this.isStopped || this._next(e);
        }
        error(e) {
          this.isStopped || ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          this.destination.error(e), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: e } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = e),
            this
          );
        }
      }
      class Jh extends me {
        constructor(e, n, r, s) {
          super(), (this._parentSubscriber = e);
          let i,
            o = this;
          In(n)
            ? (i = n)
            : n &&
              ((i = n.next),
              (r = n.error),
              (s = n.complete),
              n !== Lo &&
                ((o = Object.create(n)),
                In(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = r),
            (this._complete = s);
        }
        next(e) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: n } = this;
            $t.useDeprecatedSynchronousErrorHandling && n.syncErrorThrowable
              ? this.__tryOrSetError(n, this._next, e) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, e);
          }
        }
        error(e) {
          if (!this.isStopped) {
            const { _parentSubscriber: n } = this,
              { useDeprecatedSynchronousErrorHandling: r } = $t;
            if (this._error)
              r && n.syncErrorThrowable
                ? (this.__tryOrSetError(n, this._error, e), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, e), this.unsubscribe());
            else if (n.syncErrorThrowable)
              r ? ((n.syncErrorValue = e), (n.syncErrorThrown = !0)) : es(e),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), r)) throw e;
              es(e);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this;
            if (this._complete) {
              const n = () => this._complete.call(this._context);
              $t.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, n), this.unsubscribe())
                : (this.__tryOrUnsub(n), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(e, n) {
          try {
            e.call(this._context, n);
          } catch (r) {
            if ((this.unsubscribe(), $t.useDeprecatedSynchronousErrorHandling))
              throw r;
            es(r);
          }
        }
        __tryOrSetError(e, n, r) {
          if (!$t.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            n.call(this._context, r);
          } catch (s) {
            return $t.useDeprecatedSynchronousErrorHandling
              ? ((e.syncErrorValue = s), (e.syncErrorThrown = !0), !0)
              : (es(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: e } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            e.unsubscribe();
        }
      }
      const gi =
        ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Bo(t) {
        return t;
      }
      let ye = (() => {
        class t {
          constructor(n) {
            (this._isScalar = !1), n && (this._subscribe = n);
          }
          lift(n) {
            const r = new t();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, s) {
            const { operator: i } = this,
              o = (function (t, e, n) {
                if (t) {
                  if (t instanceof me) return t;
                  if (t[jo]) return t[jo]();
                }
                return t || e || n ? new me(t, e, n) : new me(Lo);
              })(n, r, s);
            if (
              (o.add(
                i
                  ? i.call(o, this.source)
                  : this.source ||
                    ($t.useDeprecatedSynchronousErrorHandling &&
                      !o.syncErrorThrowable)
                  ? this._subscribe(o)
                  : this._trySubscribe(o)
              ),
              $t.useDeprecatedSynchronousErrorHandling &&
                o.syncErrorThrowable &&
                ((o.syncErrorThrowable = !1), o.syncErrorThrown))
            )
              throw o.syncErrorValue;
            return o;
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              $t.useDeprecatedSynchronousErrorHandling &&
                ((n.syncErrorThrown = !0), (n.syncErrorValue = r)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof me ? n : null;
                  }
                  return !0;
                })(n)
                  ? n.error(r)
                  : console.warn(r);
            }
          }
          forEach(n, r) {
            return new (r = ep(r))((s, i) => {
              let o;
              o = this.subscribe(
                (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    i(l), o && o.unsubscribe();
                  }
                },
                i,
                s
              );
            });
          }
          _subscribe(n) {
            const { source: r } = this;
            return r && r.subscribe(n);
          }
          [gi]() {
            return this;
          }
          pipe(...n) {
            return 0 === n.length
              ? this
              : (function (t) {
                  return 0 === t.length
                    ? Bo
                    : 1 === t.length
                    ? t[0]
                    : function (n) {
                        return t.reduce((r, s) => s(r), n);
                      };
                })(n)(this);
          }
          toPromise(n) {
            return new (n = ep(n))((r, s) => {
              let i;
              this.subscribe(
                (o) => (i = o),
                (o) => s(o),
                () => r(i)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function ep(t) {
        if ((t || (t = $t.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const ts = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class Nv extends De {
        constructor(e, n) {
          super(),
            (this.subject = e),
            (this.subscriber = n),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const e = this.subject,
            n = e.observers;
          if (
            ((this.subject = null),
            !n || 0 === n.length || e.isStopped || e.closed)
          )
            return;
          const r = n.indexOf(this.subscriber);
          -1 !== r && n.splice(r, 1);
        }
      }
      class tp extends me {
        constructor(e) {
          super(e), (this.destination = e);
        }
      }
      let An = (() => {
        class t extends ye {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [jo]() {
            return new tp(this);
          }
          lift(n) {
            const r = new np(this, this);
            return (r.operator = n), r;
          }
          next(n) {
            if (this.closed) throw new ts();
            if (!this.isStopped) {
              const { observers: r } = this,
                s = r.length,
                i = r.slice();
              for (let o = 0; o < s; o++) i[o].next(n);
            }
          }
          error(n) {
            if (this.closed) throw new ts();
            (this.hasError = !0), (this.thrownError = n), (this.isStopped = !0);
            const { observers: r } = this,
              s = r.length,
              i = r.slice();
            for (let o = 0; o < s; o++) i[o].error(n);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new ts();
            this.isStopped = !0;
            const { observers: n } = this,
              r = n.length,
              s = n.slice();
            for (let i = 0; i < r; i++) s[i].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(n) {
            if (this.closed) throw new ts();
            return super._trySubscribe(n);
          }
          _subscribe(n) {
            if (this.closed) throw new ts();
            return this.hasError
              ? (n.error(this.thrownError), De.EMPTY)
              : this.isStopped
              ? (n.complete(), De.EMPTY)
              : (this.observers.push(n), new Nv(this, n));
          }
          asObservable() {
            const n = new ye();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new np(e, n)), t;
      })();
      class np extends An {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          const { destination: n } = this;
          n && n.next && n.next(e);
        }
        error(e) {
          const { destination: n } = this;
          n && n.error && this.destination.error(e);
        }
        complete() {
          const { destination: e } = this;
          e && e.complete && this.destination.complete();
        }
        _subscribe(e) {
          const { source: n } = this;
          return n ? this.source.subscribe(e) : De.EMPTY;
        }
      }
      function $o(t) {
        return t && "function" == typeof t.schedule;
      }
      function fe(t, e) {
        return function (r) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return r.lift(new Ov(t, e));
        };
      }
      class Ov {
        constructor(e, n) {
          (this.project = e), (this.thisArg = n);
        }
        call(e, n) {
          return n.subscribe(new Fv(e, this.project, this.thisArg));
        }
      }
      class Fv extends me {
        constructor(e, n, r) {
          super(e),
            (this.project = n),
            (this.count = 0),
            (this.thisArg = r || this);
        }
        _next(e) {
          let n;
          try {
            n = this.project.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      const rp = (t) => (e) => {
          for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
          e.complete();
        },
        Uo =
          "function" == typeof Symbol && Symbol.iterator
            ? Symbol.iterator
            : "@@iterator",
        sp = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function ip(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const pu = (t) => {
        if (t && "function" == typeof t[gi])
          return ((t) => (e) => {
            const n = t[gi]();
            if ("function" != typeof n.subscribe)
              throw new TypeError(
                "Provided object does not correctly implement Symbol.observable"
              );
            return n.subscribe(e);
          })(t);
        if (sp(t)) return rp(t);
        if (ip(t))
          return ((t) => (e) => (
            t
              .then(
                (n) => {
                  e.closed || (e.next(n), e.complete());
                },
                (n) => e.error(n)
              )
              .then(null, es),
            e
          ))(t);
        if (t && "function" == typeof t[Uo])
          return ((t) => (e) => {
            const n = t[Uo]();
            for (;;) {
              let r;
              try {
                r = n.next();
              } catch (s) {
                return e.error(s), e;
              }
              if (r.done) {
                e.complete();
                break;
              }
              if ((e.next(r.value), e.closed)) break;
            }
            return (
              "function" == typeof n.return &&
                e.add(() => {
                  n.return && n.return();
                }),
              e
            );
          })(t);
        {
          const n = `You provided ${
            Zh(t) ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`;
          throw new TypeError(n);
        }
      };
      function gu(t, e) {
        return new ye((n) => {
          const r = new De();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function Je(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[gi];
                  })(t)
                )
                  return (function (t, e) {
                    return new ye((n) => {
                      const r = new De();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[gi]();
                            r.add(
                              s.subscribe({
                                next(i) {
                                  r.add(e.schedule(() => n.next(i)));
                                },
                                error(i) {
                                  r.add(e.schedule(() => n.error(i)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (ip(t))
                  return (function (t, e) {
                    return new ye((n) => {
                      const r = new De();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (s) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(s),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (s) => {
                                r.add(e.schedule(() => n.error(s)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (sp(t)) return gu(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[Uo];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new ye((n) => {
                      const r = new De();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[Uo]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let i, o;
                                  try {
                                    const a = s.next();
                                    (i = a.value), (o = a.done);
                                  } catch (a) {
                                    return void n.error(a);
                                  }
                                  o
                                    ? n.complete()
                                    : (n.next(i), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof ye
          ? t
          : new ye(pu(t));
      }
      class mu extends me {
        constructor(e) {
          super(), (this.parent = e);
        }
        _next(e) {
          this.parent.notifyNext(e);
        }
        _error(e) {
          this.parent.notifyError(e), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class yu extends me {
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyError(e) {
          this.destination.error(e);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function _u(t, e) {
        if (e.closed) return;
        if (t instanceof ye) return t.subscribe(e);
        let n;
        try {
          n = pu(t)(e);
        } catch (r) {
          e.error(r);
        }
        return n;
      }
      function $e(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                $e((s, i) => Je(t(s, i)).pipe(fe((o, a) => e(s, o, i, a))), n)
              )
          : ("number" == typeof e && (n = e), (r) => r.lift(new Wv(t, n)));
      }
      class Wv {
        constructor(e, n = Number.POSITIVE_INFINITY) {
          (this.project = e), (this.concurrent = n);
        }
        call(e, n) {
          return n.subscribe(new Gv(e, this.project, this.concurrent));
        }
      }
      class Gv extends yu {
        constructor(e, n, r = Number.POSITIVE_INFINITY) {
          super(e),
            (this.project = n),
            (this.concurrent = r),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(e) {
          this.active < this.concurrent
            ? this._tryNext(e)
            : this.buffer.push(e);
        }
        _tryNext(e) {
          let n;
          const r = this.index++;
          try {
            n = this.project(e, r);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(n);
        }
        _innerSub(e) {
          const n = new mu(this),
            r = this.destination;
          r.add(n);
          const s = _u(e, n);
          s !== n && r.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
        notifyComplete() {
          const e = this.buffer;
          this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function mi(t = Number.POSITIVE_INFINITY) {
        return $e(Bo, t);
      }
      function Eu(t, e) {
        return e ? gu(t, e) : new ye(rp(t));
      }
      function Cu() {
        return function (e) {
          return e.lift(new Kv(e));
        };
      }
      class Kv {
        constructor(e) {
          this.connectable = e;
        }
        call(e, n) {
          const { connectable: r } = this;
          r._refCount++;
          const s = new Zv(e, r),
            i = n.subscribe(s);
          return s.closed || (s.connection = r.connect()), i;
        }
      }
      class Zv extends me {
        constructor(e, n) {
          super(e), (this.connectable = n);
        }
        _unsubscribe() {
          const { connectable: e } = this;
          if (!e) return void (this.connection = null);
          this.connectable = null;
          const n = e._refCount;
          if (n <= 0) return void (this.connection = null);
          if (((e._refCount = n - 1), n > 1))
            return void (this.connection = null);
          const { connection: r } = this,
            s = e._connection;
          (this.connection = null), s && (!r || s === r) && s.unsubscribe();
        }
      }
      class op extends ye {
        constructor(e, n) {
          super(),
            (this.source = e),
            (this.subjectFactory = n),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(e) {
          return this.getSubject().subscribe(e);
        }
        getSubject() {
          const e = this._subject;
          return (
            (!e || e.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let e = this._connection;
          return (
            e ||
              ((this._isComplete = !1),
              (e = this._connection = new De()),
              e.add(this.source.subscribe(new Jv(this.getSubject(), this))),
              e.closed && ((this._connection = null), (e = De.EMPTY))),
            e
          );
        }
        refCount() {
          return Cu()(this);
        }
      }
      const Yv = (() => {
        const t = op.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Jv extends tp {
        constructor(e, n) {
          super(e), (this.connectable = n);
        }
        _error(e) {
          this._unsubscribe(), super._error(e);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const e = this.connectable;
          if (e) {
            this.connectable = null;
            const n = e._connection;
            (e._refCount = 0),
              (e._subject = null),
              (e._connection = null),
              n && n.unsubscribe();
          }
        }
      }
      function nb() {
        return new An();
      }
      function te(t) {
        for (let e in t) if (t[e] === te) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function W(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(W).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function vu(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const sb = te({ __forward_ref__: te });
      function bu(t) {
        return (
          (t.__forward_ref__ = bu),
          (t.toString = function () {
            return W(this());
          }),
          t
        );
      }
      function A(t) {
        return (function (t) {
          return (
            "function" == typeof t &&
            t.hasOwnProperty(sb) &&
            t.__forward_ref__ === bu
          );
        })(t)
          ? t()
          : t;
      }
      class Qn extends Error {
        constructor(e, n) {
          super(
            (function (t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function $(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Xe(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : $(t);
      }
      function Ho(t, e) {
        const n = e ? ` in ${e}` : "";
        throw new Qn("201", `No provider for ${Xe(t)} found${n}`);
      }
      function ht(t, e) {
        null == t &&
          (function (t, e, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function U(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function Ut(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function Rn(t) {
        return lp(t, qo) || lp(t, cp);
      }
      function lp(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function up(t) {
        return t && (t.hasOwnProperty(Su) || t.hasOwnProperty(db))
          ? t[Su]
          : null;
      }
      const qo = te({ ɵprov: te }),
        Su = te({ ɵinj: te }),
        cp = te({ ngInjectableDef: te }),
        db = te({ ngInjectorDef: te });
      var P = (() => (
        ((P = P || {})[(P.Default = 0)] = "Default"),
        (P[(P.Host = 1)] = "Host"),
        (P[(P.Self = 2)] = "Self"),
        (P[(P.SkipSelf = 4)] = "SkipSelf"),
        (P[(P.Optional = 8)] = "Optional"),
        P
      ))();
      let Tu;
      function Kn(t) {
        const e = Tu;
        return (Tu = t), e;
      }
      function dp(t, e, n) {
        const r = Rn(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & P.Optional
          ? null
          : void 0 !== e
          ? e
          : void Ho(W(t), "Injector");
      }
      function Zn(t) {
        return { toString: t }.toString();
      }
      var Tt = (() => (
          ((Tt = Tt || {})[(Tt.OnPush = 0)] = "OnPush"),
          (Tt[(Tt.Default = 1)] = "Default"),
          Tt
        ))(),
        Ae = (() => (
          ((Ae = Ae || {})[(Ae.Emulated = 0)] = "Emulated"),
          (Ae[(Ae.None = 2)] = "None"),
          (Ae[(Ae.ShadowDom = 3)] = "ShadowDom"),
          Ae
        ))();
      const hb = "undefined" != typeof globalThis && globalThis,
        pb = "undefined" != typeof window && window,
        gb =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        ne = hb || ("undefined" != typeof global && global) || pb || gb,
        ns = {},
        ie = [],
        zo = te({ ɵcmp: te }),
        Iu = te({ ɵdir: te }),
        Au = te({ ɵpipe: te }),
        fp = te({ ɵmod: te }),
        mb = te({ ɵloc: te }),
        Pn = te({ ɵfac: te }),
        yi = te({ __NG_ELEMENT_ID__: te });
      let yb = 0;
      function Wo(t) {
        return Zn(() => {
          const n = {},
            r = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: n,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === Tt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ie,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || Ae.Emulated,
              id: "c",
              styles: t.styles || ie,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            s = t.directives,
            i = t.features,
            o = t.pipes;
          return (
            (r.id += yb++),
            (r.inputs = mp(t.inputs, n)),
            (r.outputs = mp(t.outputs)),
            i && i.forEach((a) => a(r)),
            (r.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(hp)
              : null),
            (r.pipeDefs = o
              ? () => ("function" == typeof o ? o() : o).map(pp)
              : null),
            r
          );
        });
      }
      function hp(t) {
        return (
          qe(t) ||
          (function (t) {
            return t[Iu] || null;
          })(t)
        );
      }
      function pp(t) {
        return (function (t) {
          return t[Au] || null;
        })(t);
      }
      const gp = {};
      function xn(t) {
        return Zn(() => {
          const e = {
            type: t.type,
            bootstrap: t.bootstrap || ie,
            declarations: t.declarations || ie,
            imports: t.imports || ie,
            exports: t.exports || ie,
            transitiveCompileScopes: null,
            schemas: t.schemas || null,
            id: t.id || null,
          };
          return null != t.id && (gp[t.id] = t.type), e;
        });
      }
      function mp(t, e) {
        if (null == t) return ns;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              i = s;
            Array.isArray(s) && ((i = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = i);
          }
        return n;
      }
      const He = Wo;
      function qe(t) {
        return t[zo] || null;
      }
      function It(t, e) {
        const n = t[fp] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${W(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const H = 11;
      function un(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function qt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Pu(t) {
        return 0 != (8 & t.flags);
      }
      function Zo(t) {
        return 2 == (2 & t.flags);
      }
      function Yo(t) {
        return 1 == (1 & t.flags);
      }
      function zt(t) {
        return null !== t.template;
      }
      function wb(t) {
        return 0 != (512 & t[2]);
      }
      function br(t, e) {
        return t.hasOwnProperty(Pn) ? t[Pn] : null;
      }
      class _p {
        constructor(e, n, r) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Ep(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = Ab), Ib;
      }
      function Ib() {
        const t = Dp(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === ns) t.previous = e;
          else for (let r in e) n[r] = e[r];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function Ab(t, e, n, r) {
        const s =
            Dp(t) ||
            (function (t, e) {
              return (t[Cp] = e);
            })(t, { previous: ns, current: null }),
          i = s.current || (s.current = {}),
          o = s.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new _p(l && l.currentValue, e, o === ns)), (t[r] = e);
      }
      const Cp = "__ngSimpleChanges__";
      function Dp(t) {
        return t[Cp] || null;
      }
      const vp = "http://www.w3.org/2000/svg";
      let Ou;
      function be(t) {
        return !!t.listen;
      }
      const wp = {
        createRenderer: (t, e) =>
          void 0 !== Ou
            ? Ou
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Me(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function gt(t, e) {
        return Me(e[t.index]);
      }
      function ku(t, e) {
        return t.data[e];
      }
      function mt(t, e) {
        const n = e[t];
        return un(n) ? n : n[0];
      }
      function Lu(t) {
        return 128 == (128 & t[2]);
      }
      function Jn(t, e) {
        return null == e ? null : t[e];
      }
      function Tp(t) {
        t[18] = 0;
      }
      function Vu(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const k = {
        lFrame: Op(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1,
      };
      function Ip() {
        return k.bindingsEnabled;
      }
      function E() {
        return k.lFrame.lView;
      }
      function Y() {
        return k.lFrame.tView;
      }
      function Sr(t) {
        return (k.lFrame.contextLView = t), t[8];
      }
      function xe() {
        let t = Ap();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Ap() {
        return k.lFrame.currentTNode;
      }
      function cn(t, e) {
        const n = k.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function ju() {
        return k.lFrame.isParent;
      }
      function Xo() {
        return k.isInCheckNoChangesMode;
      }
      function ea(t) {
        k.isInCheckNoChangesMode = t;
      }
      function ls() {
        return k.lFrame.bindingIndex++;
      }
      function Hb(t, e) {
        const n = k.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), $u(e);
      }
      function $u(t) {
        k.lFrame.currentDirectiveIndex = t;
      }
      function Hu(t) {
        k.lFrame.currentQueryIndex = t;
      }
      function zb(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function xp(t, e, n) {
        if (n & P.SkipSelf) {
          let s = e,
            i = t;
          for (
            ;
            !((s = s.parent),
            null !== s ||
              n & P.Host ||
              ((s = zb(i)), null === s || ((i = i[15]), 10 & s.type)));

          );
          if (null === s) return !1;
          (e = s), (t = i);
        }
        const r = (k.lFrame = Np());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function ta(t) {
        const e = Np(),
          n = t[1];
        (k.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Np() {
        const t = k.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Op(t) : e;
      }
      function Op(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Fp() {
        const t = k.lFrame;
        return (
          (k.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const kp = Fp;
      function na() {
        const t = Fp();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function nt() {
        return k.lFrame.selectedIndex;
      }
      function Xn(t) {
        k.lFrame.selectedIndex = t;
      }
      function he() {
        k.lFrame.currentNamespace = vp;
      }
      function pe() {
        k.lFrame.currentNamespace = null;
      }
      function ra(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const i = t.data[n].type.prototype,
            {
              ngAfterContentInit: o,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = i;
          o && (t.contentHooks || (t.contentHooks = [])).push(-n, o),
            a &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, a),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, a)),
            l && (t.viewHooks || (t.viewHooks = [])).push(-n, l),
            u &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, u),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, u)),
            null != c && (t.destroyHooks || (t.destroyHooks = [])).push(n, c);
        }
      }
      function sa(t, e, n) {
        Lp(t, e, 3, n);
      }
      function ia(t, e, n, r) {
        (3 & t[2]) === n && Lp(t, e, n, r);
      }
      function qu(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function Lp(t, e, n, r) {
        const i = null != r ? r : -1,
          o = e.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & t[18] : 0; l < o; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break;
          } else
            e[l] < 0 && (t[18] += 65536),
              (a < i || -1 == i) &&
                (Jb(t, n, e, l), (t[18] = (4294901760 & t[18]) + l + 2)),
              l++;
      }
      function Jb(t, e, n, r) {
        const s = n[r] < 0,
          i = n[r + 1],
          a = t[s ? -n[r] : n[r]];
        if (s) {
          if (t[2] >> 11 < t[18] >> 16 && (3 & t[2]) === e) {
            t[2] += 2048;
            try {
              i.call(a);
            } finally {
            }
          }
        } else
          try {
            i.call(a);
          } finally {
          }
      }
      class vi {
        constructor(e, n, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function oa(t, e, n) {
        const r = be(t);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if ("number" == typeof i) {
            if (0 !== i) break;
            s++;
            const o = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++s];
            Wu(o)
              ? r && t.setProperty(e, o, a)
              : r
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              s++;
          }
        }
        return s;
      }
      function Vp(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function Wu(t) {
        return 64 === t.charCodeAt(0);
      }
      function aa(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
              const s = e[r];
              "number" == typeof s
                ? (n = s)
                : 0 === n ||
                  jp(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
            }
          }
        return t;
      }
      function jp(t, e, n, r, s) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const a = t[i++];
            if ("number" == typeof a) {
              if (a === e) {
                o = -1;
                break;
              }
              if (a > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const a = t[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== s && (t[i + 1] = s));
            if (r === t[i + 1]) return void (t[i + 2] = s);
          }
          i++, null !== r && i++, null !== s && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== r && t.splice(i++, 0, r),
          null !== s && t.splice(i++, 0, s);
      }
      function Bp(t) {
        return -1 !== t;
      }
      function us(t) {
        return 32767 & t;
      }
      function cs(t, e) {
        let n = (function (t) {
            return t >> 16;
          })(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      let Gu = !0;
      function la(t) {
        const e = Gu;
        return (Gu = t), e;
      }
      let sw = 0;
      function wi(t, e) {
        const n = Ku(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Qu(r.data, t),
          Qu(e, null),
          Qu(r.blueprint, null));
        const s = ua(t, e),
          i = t.injectorIndex;
        if (Bp(s)) {
          const o = us(s),
            a = cs(s, e),
            l = a[1].data;
          for (let u = 0; u < 8; u++) e[i + u] = a[o + u] | l[o + u];
        }
        return (e[i + 8] = s), i;
      }
      function Qu(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Ku(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function ua(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          s = e;
        for (; null !== s; ) {
          const i = s[1],
            o = i.type;
          if (((r = 2 === o ? i.declTNode : 1 === o ? s[6] : null), null === r))
            return -1;
          if ((n++, (s = s[15]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return -1;
      }
      function ca(t, e, n) {
        !(function (t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(yi) && (r = n[yi]),
            null == r && (r = n[yi] = sw++);
          const s = 255 & r;
          e.data[t + (s >> 5)] |= 1 << s;
        })(t, e, n);
      }
      function Hp(t, e, n) {
        if (n & P.Optional) return t;
        Ho(e, "NodeInjector");
      }
      function qp(t, e, n, r) {
        if (
          (n & P.Optional && void 0 === r && (r = null),
          0 == (n & (P.Self | P.Host)))
        ) {
          const s = t[9],
            i = Kn(void 0);
          try {
            return s ? s.get(e, r, n & P.Optional) : dp(e, r, n & P.Optional);
          } finally {
            Kn(i);
          }
        }
        return Hp(r, e, n);
      }
      function zp(t, e, n, r = P.Default, s) {
        if (null !== t) {
          const i = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(yi) ? t[yi] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : aw) : e;
          })(n);
          if ("function" == typeof i) {
            if (!xp(e, t, r)) return r & P.Host ? Hp(s, n, r) : qp(e, n, r, s);
            try {
              const o = i(r);
              if (null != o || r & P.Optional) return o;
              Ho(n);
            } finally {
              kp();
            }
          } else if ("number" == typeof i) {
            let o = null,
              a = Ku(t, e),
              l = -1,
              u = r & P.Host ? e[16][6] : null;
            for (
              (-1 === a || r & P.SkipSelf) &&
              ((l = -1 === a ? ua(t, e) : e[a + 8]),
              -1 !== l && Qp(r, !1)
                ? ((o = e[1]), (a = us(l)), (e = cs(l, e)))
                : (a = -1));
              -1 !== a;

            ) {
              const c = e[1];
              if (Gp(i, a, c.data)) {
                const d = lw(a, e, n, o, r, u);
                if (d !== Wp) return d;
              }
              (l = e[a + 8]),
                -1 !== l && Qp(r, e[1].data[a + 8] === u) && Gp(i, a, e)
                  ? ((o = c), (a = us(l)), (e = cs(l, e)))
                  : (a = -1);
            }
          }
        }
        return qp(e, n, r, s);
      }
      const Wp = {};
      function aw() {
        return new ds(xe(), E());
      }
      function lw(t, e, n, r, s, i) {
        const o = e[1],
          a = o.data[t + 8],
          c = (function (t, e, n, r, s) {
            const i = t.providerIndexes,
              o = e.data,
              a = 1048575 & i,
              l = t.directiveStart,
              c = i >> 20,
              f = s ? a + c : t.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = o[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (s) {
              const h = o[l];
              if (h && zt(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            o,
            n,
            null == r ? Zo(a) && Gu : r != o && 0 != (3 & a.type),
            s & P.Host && i === a
          );
        return null !== c ? Si(e, o, c, a) : Wp;
      }
      function Si(t, e, n, r) {
        let s = t[n];
        const i = e.data;
        if (
          (function (t) {
            return t instanceof vi;
          })(s)
        ) {
          const o = s;
          o.resolving &&
            (function (t, e) {
              throw new Qn(
                "200",
                `Circular dependency in DI detected for ${t}`
              );
            })(Xe(i[n]));
          const a = la(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? Kn(o.injectImpl) : null;
          xp(t, r, P.Default);
          try {
            (s = t[n] = o.factory(void 0, i, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: s,
                    ngDoCheck: i,
                  } = e.type.prototype;
                  if (r) {
                    const o = Ep(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o);
                  }
                  s &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, s),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && Kn(l), la(a), (o.resolving = !1), kp();
          }
        }
        return s;
      }
      function Gp(t, e, n) {
        return !!(n[e + (t >> 5)] & (1 << t));
      }
      function Qp(t, e) {
        return !(t & P.Self || (t & P.Host && e));
      }
      class ds {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n, r) {
          return zp(this._tNode, this._lView, e, r, n);
        }
      }
      const hs = "__parameters__";
      function Tr(t, e, n) {
        return Zn(() => {
          const r = (function (t) {
            return function (...n) {
              if (t) {
                const r = t(...n);
                for (const s in r) this[s] = r[s];
              }
            };
          })(e);
          function s(...i) {
            if (this instanceof s) return r.apply(this, i), this;
            const o = new s(...i);
            return (a.annotation = o), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(hs)
                ? l[hs]
                : Object.defineProperty(l, hs, { value: [] })[hs];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(o), l;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      class J {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = U({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const hw = new J("AnalyzeForEntryComponents"),
        fa = Function;
      function fn(t, e) {
        t.forEach((n) => (Array.isArray(n) ? fn(n, e) : e(n)));
      }
      function pa(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Ir(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      const Ri = {},
        ec = "__NG_DI_FLAG__",
        ms = "ngTempTokenPath",
        bw = /\n/gm,
        tc = "__source",
        nc = te({ provide: String, useValue: te });
      let Pi;
      function ys(t) {
        const e = Pi;
        return (Pi = t), e;
      }
      function Sw(t, e = P.Default) {
        if (void 0 === Pi)
          throw new Error("inject() must be called from an injection context");
        return null === Pi
          ? dp(t, void 0, e)
          : Pi.get(t, e & P.Optional ? null : void 0, e);
      }
      function b(t, e = P.Default) {
        return (Tu || Sw)(A(t), e);
      }
      function Ar(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = A(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let s,
              i = P.Default;
            for (let o = 0; o < r.length; o++) {
              const a = r[o],
                l = Tw(a);
              "number" == typeof l
                ? -1 === l
                  ? (s = a.token)
                  : (i |= l)
                : (s = a);
            }
            e.push(b(s, i));
          } else e.push(b(r));
        }
        return e;
      }
      function xi(t, e) {
        return (t[ec] = e), (t.prototype[ec] = e), t;
      }
      function Tw(t) {
        return t[ec];
      }
      function eg(t, e, n, r) {
        const s = t[ms];
        throw (
          (e[tc] && s.unshift(e[tc]),
          (t.message = (function (t, e, n, r = null) {
            t =
              t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                ? t.substr(2)
                : t;
            let s = W(e);
            if (Array.isArray(e)) s = e.map(W).join(" -> ");
            else if ("object" == typeof e) {
              let i = [];
              for (let o in e)
                if (e.hasOwnProperty(o)) {
                  let a = e[o];
                  i.push(
                    o + ":" + ("string" == typeof a ? JSON.stringify(a) : W(a))
                  );
                }
              s = `{${i.join(", ")}}`;
            }
            return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
              bw,
              "\n  "
            )}`;
          })("\n" + t.message, s, n, r)),
          (t.ngTokenPath = s),
          (t[ms] = null),
          t)
        );
      }
      const _s = xi(
          Tr("Inject", (t) => ({ token: t })),
          -1
        ),
        ut = xi(Tr("Optional"), 8),
        nr = xi(Tr("SkipSelf"), 4);
      var _t = (() => (
        ((_t = _t || {})[(_t.Important = 1)] = "Important"),
        (_t[(_t.DashCase = 2)] = "DashCase"),
        _t
      ))();
      const og = "__ngContext__";
      function We(t, e) {
        t[og] = e;
      }
      function ic(t) {
        const e = (function (t) {
          return t[og] || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function ac(t, e) {
        return undefined(t, e);
      }
      function Fi(t) {
        const e = t[3];
        return qt(e) ? e[3] : e;
      }
      function lc(t) {
        return hg(t[13]);
      }
      function uc(t) {
        return hg(t[4]);
      }
      function hg(t) {
        for (; null !== t && !qt(t); ) t = t[4];
        return t;
      }
      function Cs(t, e, n, r, s) {
        if (null != r) {
          let i,
            o = !1;
          qt(r) ? (i = r) : un(r) && ((o = !0), (r = r[0]));
          const a = Me(r);
          0 === t && null !== n
            ? null == s
              ? Eg(e, n, a)
              : Mr(e, n, a, s || null, !0)
            : 1 === t && null !== n
            ? Mr(e, n, a, s || null, !0)
            : 2 === t
            ? (function (t, e, n) {
                const r = Ea(t, e);
                r &&
                  (function (t, e, n, r) {
                    be(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function (t, e, n, r, s) {
                const i = n[7];
                i !== Me(n) && Cs(e, t, r, i, s);
                for (let a = 10; a < n.length; a++) {
                  const l = n[a];
                  ki(l[1], l, t, e, r, i);
                }
              })(e, t, i, n, s);
        }
      }
      function dc(t, e, n) {
        return be(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function gg(t, e) {
        const n = t[9],
          r = n.indexOf(e),
          s = e[3];
        1024 & e[2] && ((e[2] &= -1025), Vu(s, -1)), n.splice(r, 1);
      }
      function fc(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && gg(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const i = Ir(t, 10 + e);
          !(function (t, e) {
            ki(t, e, e[H], 2, null, null), (e[0] = null), (e[6] = null);
          })(r[1], r);
          const o = i[19];
          null !== o && o.detachView(i[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function mg(t, e) {
        if (!(256 & e[2])) {
          const n = e[H];
          be(n) && n.destroyNode && ki(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return hc(t[1], t);
              for (; e; ) {
                let n = null;
                if (un(e)) n = e[13];
                else {
                  const r = e[10];
                  r && (n = r);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    un(e) && hc(e[1], e), (e = e[3]);
                  null === e && (e = t), un(e) && hc(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function hc(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const s = e[n[r]];
                  if (!(s instanceof vi)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let o = 0; o < i.length; o += 2) {
                        const a = s[i[o]],
                          l = i[o + 1];
                        try {
                          l.call(a);
                        } finally {
                        }
                      }
                    else
                      try {
                        i.call(s);
                      } finally {
                      }
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup,
                r = e[7];
              let s = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const o = n[i + 1],
                      a = "function" == typeof o ? o(e) : Me(e[o]),
                      l = r[(s = n[i + 2])],
                      u = n[i + 3];
                    "boolean" == typeof u
                      ? a.removeEventListener(n[i], l, u)
                      : u >= 0
                      ? r[(s = u)]()
                      : r[(s = -u)].unsubscribe(),
                      (i += 2);
                  } else {
                    const o = r[(s = n[i + 1])];
                    n[i].call(o);
                  }
              if (null !== r) {
                for (let i = s + 1; i < r.length; i++) r[i]();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && be(e[H]) && e[H].destroy();
          const n = e[17];
          if (null !== n && qt(e[3])) {
            n !== e[3] && gg(n, e);
            const r = e[19];
            null !== r && r.detachView(t);
          }
        }
      }
      function yg(t, e, n) {
        return (function (t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[0];
          if (2 & r.flags) {
            const s = t.data[r.directiveStart].encapsulation;
            if (s === Ae.None || s === Ae.Emulated) return null;
          }
          return gt(r, n);
        })(t, e.parent, n);
      }
      function Mr(t, e, n, r, s) {
        be(t) ? t.insertBefore(e, n, r, s) : e.insertBefore(n, r, s);
      }
      function Eg(t, e, n) {
        be(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function Cg(t, e, n, r, s) {
        null !== r ? Mr(t, e, n, r, s) : Eg(t, e, n);
      }
      function Ea(t, e) {
        return be(t) ? t.parentNode(e) : e.parentNode;
      }
      let bg = function (t, e, n) {
        return 40 & t.type ? gt(t, n) : null;
      };
      function Ca(t, e, n, r) {
        const s = yg(t, r, e),
          i = e[H],
          a = (function (t, e, n) {
            return bg(t, e, n);
          })(r.parent || e[6], r, e);
        if (null != s)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) Cg(i, s, n[l], a, !1);
          else Cg(i, s, n, a, !1);
      }
      function Da(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return gt(e, t);
          if (4 & n) return gc(-1, t[e.index]);
          if (8 & n) {
            const r = e.child;
            if (null !== r) return Da(t, r);
            {
              const s = t[e.index];
              return qt(s) ? gc(-1, s) : Me(s);
            }
          }
          if (32 & n) return ac(e, t)() || Me(t[e.index]);
          {
            const r = Sg(t, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Da(Fi(t[16]), r)
              : Da(t, e.next);
          }
        }
        return null;
      }
      function Sg(t, e) {
        return null !== e ? t[16][6].projection[e.projection] : null;
      }
      function gc(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const r = e[n],
            s = r[1].firstChild;
          if (null !== s) return Da(r, s);
        }
        return e[7];
      }
      function yc(t, e, n, r, s, i, o) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && We(Me(a), r), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) yc(t, e, n.child, r, s, i, !1), Cs(e, t, s, a, i);
            else if (32 & l) {
              const u = ac(n, r);
              let c;
              for (; (c = u()); ) Cs(e, t, s, c, i);
              Cs(e, t, s, a, i);
            } else 16 & l ? Tg(t, e, r, n, s, i) : Cs(e, t, s, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function ki(t, e, n, r, s, i) {
        yc(n, r, t.firstChild, e, s, i, !1);
      }
      function Tg(t, e, n, r, s, i) {
        const o = n[16],
          l = o[6].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Cs(e, t, s, l[u], i);
        else yc(t, e, l, o[3], s, i, !0);
      }
      function Ig(t, e, n) {
        be(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function _c(t, e, n) {
        be(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function Sa(t) {
        return t.ngOriginalError;
      }
      function j1(t, ...e) {
        t.error(...e);
      }
      class xr {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e),
            r = this._findContext(e),
            s = (function (t) {
              return (t && t.ngErrorLogger) || j1;
            })(e);
          s(this._console, "ERROR", e),
            n && s(this._console, "ORIGINAL ERROR", n),
            r && s(this._console, "ERROR CONTEXT", r);
        }
        _findContext(e) {
          return e
            ? (function (t) {
                return t.ngDebugContext;
              })(e) || this._findContext(Sa(e))
            : null;
        }
        _findOriginalError(e) {
          let n = e && Sa(e);
          for (; n && Sa(n); ) n = Sa(n);
          return n || null;
        }
      }
      const Wg = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(ne))();
      function gn(t) {
        return t instanceof Function ? t() : t;
      }
      function Qg(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const i = e.length;
            if (s + i === r || t.charCodeAt(s + i) <= 32) return s;
          }
          n = s + 1;
        }
      }
      const Kg = "ng-template";
      function G1(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== Qg(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function Zg(t) {
        return 4 === t.type && t.value !== Kg;
      }
      function Q1(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Kg);
      }
      function K1(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          i = (function (t) {
            for (let e = 0; e < t.length; e++) if (Vp(t[e])) return e;
            return t.length;
          })(s);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !Q1(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Wt(r)) return !1;
                  o = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!G1(t.attrs, u, n)) {
                    if (Wt(r)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const d = Z1(8 & r ? "class" : l, s, Zg(t), n);
                if (-1 === d) {
                  if (Wt(r)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > i ? "" : s[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== Qg(h, u, 0)) || (2 & r && u !== f)) {
                    if (Wt(r)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Wt(r) && !Wt(l)) return !1;
            if (o && Wt(l)) continue;
            (o = !1), (r = l | (1 & r));
          }
        }
        return Wt(r) || o;
      }
      function Wt(t) {
        return 0 == (1 & t);
      }
      function Z1(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let i = !1;
          for (; s < e.length; ) {
            const o = e[s];
            if (o === t) return s;
            if (3 === o || 6 === o) i = !0;
            else {
              if (1 === o || 2 === o) {
                let a = e[++s];
                for (; "string" == typeof a; ) a = e[++s];
                continue;
              }
              if (4 === o) break;
              if (0 === o) {
                s += 4;
                continue;
              }
            }
            s += i ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Yg(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (K1(t, e[r], n)) return !0;
        return !1;
      }
      function Jg(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function tS(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & r) {
              const a = t[++n];
              s += "[" + o + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (s += "." + o) : 4 & r && (s += " " + o);
          else
            "" !== s && !Wt(o) && ((e += Jg(i, s)), (s = "")),
              (r = o),
              (i = i || !Wt(r));
          n++;
        }
        return "" !== s && (e += Jg(i, s)), e;
      }
      const V = {};
      function rr(t) {
        Xg(Y(), E(), nt() + t, Xo());
      }
      function Xg(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const i = t.preOrderCheckHooks;
            null !== i && sa(e, i, n);
          } else {
            const i = t.preOrderHooks;
            null !== i && ia(e, i, 0, n);
          }
        Xn(n);
      }
      function um(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              i = n[r + 1];
            if (-1 !== i) {
              const o = t.data[i];
              Hu(s), o.contentQueries(2, e[i], i);
            }
          }
      }
      function Bi(t, e, n, r, s, i, o, a, l, u) {
        const c = e.blueprint.slice();
        return (
          (c[0] = s),
          (c[2] = 140 | r),
          Tp(c),
          (c[3] = c[15] = t),
          (c[8] = n),
          (c[10] = o || (t && t[10])),
          (c[H] = a || (t && t[H])),
          (c[12] = l || (t && t[12]) || null),
          (c[9] = u || (t && t[9]) || null),
          (c[6] = i),
          (c[16] = 2 == e.type ? t[16] : c),
          c
        );
      }
      function vs(t, e, n, r, s) {
        let i = t.data[e];
        if (null === i)
          (i = (function (t, e, n, r, s) {
            const i = Ap(),
              o = ju(),
              l = (t.data[e] = (function (t, e, n, r, s, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: s,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, o ? i : i && i.parent, n, e, r, s));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== i &&
                (o
                  ? null == i.child && null !== l.parent && (i.child = l)
                  : null === i.next && (i.next = l)),
              l
            );
          })(t, e, n, r, s)),
            k.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = s);
          const o = (function () {
            const t = k.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === o ? -1 : o.injectorIndex;
        }
        return cn(i, !0), i;
      }
      function bs(t, e, n, r) {
        if (0 === n) return -1;
        const s = e.length;
        for (let i = 0; i < n; i++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return s;
      }
      function $i(t, e, n) {
        ta(e);
        try {
          const r = t.viewQuery;
          null !== r && zc(1, r, n);
          const s = t.template;
          null !== s && cm(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && um(t, e),
            t.staticViewQueries && zc(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) OS(t, e[n]);
            })(e, i);
        } catch (r) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[2] &= -5), na();
        }
      }
      function ws(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        ta(e);
        const i = Xo();
        try {
          Tp(e),
            (function (t) {
              k.lFrame.bindingIndex = t;
            })(t.bindingStartIndex),
            null !== n && cm(t, e, n, 2, r);
          const o = 3 == (3 & s);
          if (!i)
            if (o) {
              const u = t.preOrderCheckHooks;
              null !== u && sa(e, u, null);
            } else {
              const u = t.preOrderHooks;
              null !== u && ia(e, u, 0, null), qu(e, 0);
            }
          if (
            ((function (t) {
              for (let e = lc(t); null !== e; e = uc(e)) {
                if (!e[2]) continue;
                const n = e[9];
                for (let r = 0; r < n.length; r++) {
                  const s = n[r],
                    i = s[3];
                  0 == (1024 & s[2]) && Vu(i, 1), (s[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = lc(t); null !== e; e = uc(e))
                for (let n = 10; n < e.length; n++) {
                  const r = e[n],
                    s = r[1];
                  Lu(r) && ws(s, r, s.template, r[8]);
                }
            })(e),
            null !== t.contentQueries && um(t, e),
            !i)
          )
            if (o) {
              const u = t.contentCheckHooks;
              null !== u && sa(e, u);
            } else {
              const u = t.contentHooks;
              null !== u && ia(e, u, 1), qu(e, 1);
            }
          !(function (t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  if (s < 0) Xn(~s);
                  else {
                    const i = s,
                      o = n[++r],
                      a = n[++r];
                    Hb(o, i), a(2, e[i]);
                  }
                }
              } finally {
                Xn(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) NS(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && zc(2, l, r), !i))
            if (o) {
              const u = t.viewCheckHooks;
              null !== u && sa(e, u);
            } else {
              const u = t.viewHooks;
              null !== u && ia(e, u, 2), qu(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Vu(e[3], -1));
        } finally {
          na();
        }
      }
      function pS(t, e, n, r) {
        const s = e[10],
          i = !Xo(),
          o = (function (t) {
            return 4 == (4 & t[2]);
          })(e);
        try {
          i && !o && s.begin && s.begin(), o && $i(t, e, r), ws(t, e, n, r);
        } finally {
          i && !o && s.end && s.end();
        }
      }
      function cm(t, e, n, r, s) {
        const i = nt(),
          o = 2 & r;
        try {
          Xn(-1), o && e.length > 20 && Xg(t, e, 20, Xo()), n(r, s);
        } finally {
          Xn(i);
        }
      }
      function Lc(t, e, n) {
        !Ip() ||
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || wi(n, e), We(r, e);
            const o = n.initialInputs;
            for (let a = s; a < i; a++) {
              const l = t.data[a],
                u = zt(l);
              u && AS(e, n, l);
              const c = Si(e, t, a, n);
              We(c, e),
                null !== o && MS(0, a - s, c, l, 0, o),
                u && (mt(n.index, e)[8] = c);
            }
          })(t, e, n, gt(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                o = n.index,
                a = k.lFrame.currentDirectiveIndex;
              try {
                Xn(o);
                for (let l = r; l < s; l++) {
                  const u = t.data[l],
                    c = e[l];
                  $u(l),
                    (null !== u.hostBindings ||
                      0 !== u.hostVars ||
                      null !== u.hostAttrs) &&
                      Em(u, c);
                }
              } finally {
                Xn(-1), $u(a);
              }
            })(t, e, n));
      }
      function Vc(t, e, n = gt) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const o = r[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[s++] = a;
          }
        }
      }
      function fm(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Ma(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Ma(t, e, n, r, s, i, o, a, l, u) {
        const c = 20 + r,
          d = c + s,
          f = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : V);
            return n;
          })(c, d),
          h = "function" == typeof u ? u() : u;
        return (f[1] = {
          type: t,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function mm(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function jc(t, e, n, r) {
        let s = !1;
        if (Ip()) {
          const i = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let i = 0; i < r.length; i++) {
                  const o = r[i];
                  Yg(n, o.selectors, !1) &&
                    (s || (s = []),
                    ca(wi(n, e), t, o.type),
                    zt(o) ? (Cm(t, n), s.unshift(o)) : s.push(o));
                }
              return s;
            })(t, e, n),
            o = null === r ? null : { "": -1 };
          if (null !== i) {
            (s = !0), Dm(n, t.data.length, i.length);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              d.providersResolver && d.providersResolver(d);
            }
            let a = !1,
              l = !1,
              u = bs(t, e, i.length, null);
            for (let c = 0; c < i.length; c++) {
              const d = i[c];
              (n.mergedAttrs = aa(n.mergedAttrs, d.hostAttrs)),
                vm(t, n, e, u, d),
                IS(u, d, o),
                null !== d.contentQueries && (n.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (n.flags |= 128);
              const f = d.type.prototype;
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (l = !0)),
                u++;
            }
            !(function (t, e) {
              const r = e.directiveEnd,
                s = t.data,
                i = e.attrs,
                o = [];
              let a = null,
                l = null;
              for (let u = e.directiveStart; u < r; u++) {
                const c = s[u],
                  d = c.inputs,
                  f = null === i || Zg(e) ? null : RS(d, i);
                o.push(f), (a = mm(d, u, a)), (l = mm(c.outputs, u, l));
              }
              null !== a &&
                (a.hasOwnProperty("class") && (e.flags |= 16),
                a.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = a),
                (e.outputs = l);
            })(t, n);
          }
          o &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let s = 0; s < e.length; s += 2) {
                  const i = n[e[s + 1]];
                  if (null == i)
                    throw new Qn(
                      "301",
                      `Export of name '${e[s + 1]}' not found!`
                    );
                  r.push(e[s], i);
                }
              }
            })(n, r, o);
        }
        return (n.mergedAttrs = aa(n.mergedAttrs, n.attrs)), s;
      }
      function _m(t, e, n, r, s, i) {
        const o = i.hostBindings;
        if (o) {
          let a = t.hostBindingOpCodes;
          null === a && (a = t.hostBindingOpCodes = []);
          const l = ~e.index;
          (function (t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(a) != l && a.push(l),
            a.push(r, s, o);
        }
      }
      function Em(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function Cm(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function IS(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          zt(e) && (n[""] = t);
        }
      }
      function Dm(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function vm(t, e, n, r, s) {
        t.data[r] = s;
        const i = s.factory || (s.factory = br(s.type)),
          o = new vi(i, zt(s), null);
        (t.blueprint[r] = o),
          (n[r] = o),
          _m(t, e, 0, r, bs(t, n, s.hostVars, V), s);
      }
      function AS(t, e, n) {
        const r = gt(e, t),
          s = fm(n),
          i = t[10],
          o = Ra(
            t,
            Bi(
              t,
              s,
              null,
              n.onPush ? 64 : 16,
              r,
              e,
              i,
              i.createRenderer(r, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function MS(t, e, n, r, s, i) {
        const o = i[e];
        if (null !== o) {
          const a = r.setInput;
          for (let l = 0; l < o.length; ) {
            const u = o[l++],
              c = o[l++],
              d = o[l++];
            null !== a ? r.setInput(n, d, u, c) : (n[c] = d);
          }
        }
      }
      function RS(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function bm(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function NS(t, e) {
        const n = mt(e, t);
        if (Lu(n)) {
          const r = n[1];
          80 & n[2] ? ws(r, n, r.template, n[8]) : n[5] > 0 && $c(n);
        }
      }
      function $c(t) {
        for (let r = lc(t); null !== r; r = uc(r))
          for (let s = 10; s < r.length; s++) {
            const i = r[s];
            if (1024 & i[2]) {
              const o = i[1];
              ws(o, i, o.template, i[8]);
            } else i[5] > 0 && $c(i);
          }
        const n = t[1].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const s = mt(n[r], t);
            Lu(s) && s[5] > 0 && $c(s);
          }
      }
      function OS(t, e) {
        const n = mt(e, t),
          r = n[1];
        (function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          $i(r, n, n[8]);
      }
      function Ra(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function Uc(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Fi(t);
          if (wb(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function qc(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          ws(t, e, t.template, n);
        } catch (s) {
          throw (Am(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function wm(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = ic(n),
              s = r[1];
            pS(s, r, s.template, n);
          }
        })(t[8]);
      }
      function zc(t, e, n) {
        Hu(0), e(t, n);
      }
      const jS = (() => Promise.resolve(null))();
      function Sm(t) {
        return t[7] || (t[7] = []);
      }
      function Tm(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Am(t, e) {
        const n = t[9],
          r = n ? n.get(xr, null) : null;
        r && r.handleError(e);
      }
      function Mm(t, e, n, r, s) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            u = t.data[o];
          null !== u.setInput ? u.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function kn(t, e, n) {
        const r = (function (t, e) {
          return Me(e[t]);
        })(e, t);
        !(function (t, e, n) {
          be(t) ? t.setValue(e, n) : (e.textContent = n);
        })(t[H], r, n);
      }
      function Pa(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const a = e[o];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (s = vu(s, a))
              : 2 == i && (r = vu(r, a + ": " + e[++o] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      const Ss = new J("INJECTOR", -1);
      class Rm {
        get(e, n = Ri) {
          if (n === Ri) {
            const r = new Error(`NullInjectorError: No provider for ${W(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      const Ui = new J("Set Injector scope."),
        Hi = {},
        US = {};
      let Wc;
      function Pm() {
        return void 0 === Wc && (Wc = new Rm()), Wc;
      }
      function xm(t, e = null, n = null, r) {
        return new qS(t, n, e || Pm(), r);
      }
      class qS {
        constructor(e, n, r, s = null) {
          (this.parent = r),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const i = [];
          n && fn(n, (a) => this.processProvider(a, e, n)),
            fn([e], (a) => this.processInjectorType(a, [], i)),
            this.records.set(Ss, Ts(void 0, this));
          const o = this.records.get(Ui);
          (this.scope = null != o ? o.value : null),
            (this.source = s || ("object" == typeof e ? null : W(e)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((e) => e.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(e, n = Ri, r = P.Default) {
          this.assertNotDestroyed();
          const s = ys(this),
            i = Kn(void 0);
          try {
            if (!(r & P.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function (t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof J)
                    );
                  })(e) && Rn(e);
                (a = l && this.injectableDefInScope(l) ? Ts(Gc(e), Hi) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & P.Self ? Pm() : this.parent).get(
              e,
              (n = r & P.Optional && n === Ri ? null : n)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (((o[ms] = o[ms] || []).unshift(W(e)), s)) throw o;
              return eg(o, e, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            Kn(i), ys(s);
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((e) => this.get(e));
        }
        toString() {
          const e = [];
          return (
            this.records.forEach((r, s) => e.push(W(s))),
            `R3Injector[${e.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(e, n, r) {
          if (!(e = A(e))) return !1;
          let s = up(e);
          const i = (null == s && e.ngModule) || void 0,
            o = void 0 === i ? e : i,
            a = -1 !== r.indexOf(o);
          if ((void 0 !== i && (s = up(i)), null == s)) return !1;
          if (null != s.imports && !a) {
            let c;
            r.push(o);
            try {
              fn(s.imports, (d) => {
                this.processInjectorType(d, n, r) &&
                  (void 0 === c && (c = []), c.push(d));
              });
            } finally {
            }
            if (void 0 !== c)
              for (let d = 0; d < c.length; d++) {
                const { ngModule: f, providers: h } = c[d];
                fn(h, (p) => this.processProvider(p, f, h || ie));
              }
          }
          this.injectorDefTypes.add(o);
          const l = br(o) || (() => new o());
          this.records.set(o, Ts(l, Hi));
          const u = s.providers;
          if (null != u && !a) {
            const c = e;
            fn(u, (d) => this.processProvider(d, c, u));
          }
          return void 0 !== i && void 0 !== e.providers;
        }
        processProvider(e, n, r) {
          let s = Is((e = A(e))) ? e : A(e && e.provide);
          const i = (function (t, e, n) {
            return Om(t)
              ? Ts(void 0, t.useValue)
              : Ts(
                  (function (t, e, n) {
                    let r;
                    if (Is(t)) {
                      const s = A(t);
                      return br(s) || Gc(s);
                    }
                    if (Om(t)) r = () => A(t.useValue);
                    else if (
                      (function (t) {
                        return !(!t || !t.useFactory);
                      })(t)
                    )
                      r = () => t.useFactory(...Ar(t.deps || []));
                    else if (
                      (function (t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => b(A(t.useExisting));
                    else {
                      const s = A(t && (t.useClass || t.provide));
                      if (
                        !(function (t) {
                          return !!t.deps;
                        })(t)
                      )
                        return br(s) || Gc(s);
                      r = () => new s(...Ar(t.deps));
                    }
                    return r;
                  })(t),
                  Hi
                );
          })(e);
          if (Is(e) || !0 !== e.multi) this.records.get(s);
          else {
            let o = this.records.get(s);
            o ||
              ((o = Ts(void 0, Hi, !0)),
              (o.factory = () => Ar(o.multi)),
              this.records.set(s, o)),
              (s = e),
              o.multi.push(e);
          }
          this.records.set(s, i);
        }
        hydrate(e, n) {
          return (
            n.value === Hi && ((n.value = US), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function (t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this.onDestroy.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = A(e.providedIn);
          return "string" == typeof n
            ? "any" === n || n === this.scope
            : this.injectorDefTypes.has(n);
        }
      }
      function Gc(t) {
        const e = Rn(t),
          n = null !== e ? e.factory : br(t);
        if (null !== n) return n;
        if (t instanceof J)
          throw new Error(`Token ${W(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const r = (function (t, e) {
                const n = [];
                for (let r = 0; r < t; r++) n.push(e);
                return n;
              })(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${W(t)}: (${r.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[qo] || t[cp]);
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Ts(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function Om(t) {
        return null !== t && "object" == typeof t && nc in t;
      }
      function Is(t) {
        return "function" == typeof t;
      }
      const Fm = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = xm(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let oe = (() => {
        class t {
          static create(n, r) {
            return Array.isArray(n)
              ? Fm(n, r, "")
              : Fm(n.providers, n.parent, n.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ri),
          (t.NULL = new Rm()),
          (t.ɵprov = U({ token: t, providedIn: "any", factory: () => b(Ss) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function dT(t, e) {
        ra(ic(t)[1], xe());
      }
      let xa = null;
      function As() {
        if (!xa) {
          const t = ne.Symbol;
          if (t && t.iterator) xa = t.iterator;
          else {
            const e = Object.getOwnPropertyNames(Map.prototype);
            for (let n = 0; n < e.length; ++n) {
              const r = e[n];
              "entries" !== r &&
                "size" !== r &&
                Map.prototype[r] === Map.prototype.entries &&
                (xa = r);
            }
          }
        }
        return xa;
      }
      function zi(t) {
        return (
          !!ed(t) && (Array.isArray(t) || (!(t instanceof Map) && As() in t))
        );
      }
      function ed(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Ge(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Or(t, e, n, r, s, i, o, a) {
        const l = E(),
          u = Y(),
          c = t + 20,
          d = u.firstCreatePass
            ? (function (t, e, n, r, s, i, o, a, l) {
                const u = e.consts,
                  c = vs(e, t, 4, o || null, Jn(u, a));
                jc(e, n, c, Jn(u, l)), ra(e, c);
                const d = (c.tViews = Ma(
                  2,
                  c,
                  r,
                  s,
                  i,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (d.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, e, n, r, s, i, o)
            : u.data[c];
        cn(d, !1);
        const f = l[H].createComment("");
        Ca(u, l, f, d),
          We(f, l),
          Ra(l, (l[c] = bm(f, l, f, d))),
          Yo(d) && Lc(u, l, d),
          null != o && Vc(l, d, a);
      }
      function or(t) {
        return (function (t, e) {
          return t[e];
        })(k.lFrame.contextLView, 20 + t);
      }
      function M(t, e = P.Default) {
        const n = E();
        return null === n ? b(t, e) : zp(xe(), n, A(t), e);
      }
      function ar(t, e, n) {
        const r = E();
        return (
          Ge(r, ls(), e) &&
            (function (t, e, n, r, s, i, o, a) {
              const l = gt(e, n);
              let c,
                u = e.inputs;
              !a && null != u && (c = u[r])
                ? (Mm(t, n, c, r, s),
                  Zo(e) &&
                    (function (t, e) {
                      const n = mt(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((r = (function (t) {
                    return "class" === t
                      ? "className"
                      : "for" === t
                      ? "htmlFor"
                      : "formaction" === t
                      ? "formAction"
                      : "innerHtml" === t
                      ? "innerHTML"
                      : "readonly" === t
                      ? "readOnly"
                      : "tabindex" === t
                      ? "tabIndex"
                      : t;
                  })(r)),
                  (s = null != o ? o(s, e.value || "", r) : s),
                  be(i)
                    ? i.setProperty(l, r, s)
                    : Wu(r) ||
                      (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
            })(
              Y(),
              (function () {
                const t = k.lFrame;
                return ku(t.tView, t.selectedIndex);
              })(),
              r,
              t,
              e,
              r[H],
              n,
              !1
            ),
          ar
        );
      }
      function od(t, e, n, r, s) {
        const o = s ? "class" : "style";
        Mm(t, n, e.inputs[o], o, r);
      }
      function C(t, e, n, r) {
        const s = E(),
          i = Y(),
          o = 20 + t,
          a = s[H],
          l = (s[o] = dc(a, e, k.lFrame.currentNamespace)),
          u = i.firstCreatePass
            ? (function (t, e, n, r, s, i, o) {
                const a = e.consts,
                  u = vs(e, t, 2, s, Jn(a, i));
                return (
                  jc(e, n, u, Jn(a, o)),
                  null !== u.attrs && Pa(u, u.attrs, !1),
                  null !== u.mergedAttrs && Pa(u, u.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, u),
                  u
                );
              })(o, i, s, 0, e, n, r)
            : i.data[o];
        cn(u, !0);
        const c = u.mergedAttrs;
        null !== c && oa(a, l, c);
        const d = u.classes;
        null !== d && _c(a, l, d);
        const f = u.styles;
        null !== f && Ig(a, l, f),
          64 != (64 & u.flags) && Ca(i, s, l, u),
          0 === k.lFrame.elementDepthCount && We(l, s),
          k.lFrame.elementDepthCount++,
          Yo(u) &&
            (Lc(i, s, u),
            (function (t, e, n) {
              if (Pu(e)) {
                const s = e.directiveEnd;
                for (let i = e.directiveStart; i < s; i++) {
                  const o = t.data[i];
                  o.contentQueries && o.contentQueries(1, n[i], i);
                }
              }
            })(i, u, s)),
          null !== r && Vc(s, u);
      }
      function D() {
        let t = xe();
        ju() ? (k.lFrame.isParent = !1) : ((t = t.parent), cn(t, !1));
        const e = t;
        k.lFrame.elementDepthCount--;
        const n = Y();
        n.firstCreatePass && (ra(n, t), Pu(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            od(n, e, E(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            od(n, e, E(), e.stylesWithoutHost, !1);
      }
      function O(t, e, n, r) {
        C(t, e, n, r), D();
      }
      function Fa(t) {
        return !!t && "function" == typeof t.then;
      }
      const ad = function (t) {
        return !!t && "function" == typeof t.subscribe;
      };
      function _n(t, e, n, r) {
        const s = E(),
          i = Y(),
          o = xe();
        return (
          (function (t, e, n, r, s, i, o, a) {
            const l = Yo(r),
              c = t.firstCreatePass && Tm(t),
              d = e[8],
              f = Sm(e);
            let h = !0;
            if (3 & r.type || a) {
              const g = gt(r, e),
                _ = a ? a(g) : g,
                y = f.length,
                v = a ? (w) => a(Me(w[r.index])) : r.index;
              if (be(n)) {
                let w = null;
                if (
                  (!a &&
                    l &&
                    (w = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let i = 0; i < s.length - 1; i += 2) {
                          const o = s[i];
                          if (o === n && s[i + 1] === r) {
                            const a = e[7],
                              l = s[i + 2];
                            return a.length > l ? a[l] : null;
                          }
                          "string" == typeof o && (i += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== w)
                )
                  ((w.__ngLastListenerFn__ || w).__ngNextListenerFn__ = i),
                    (w.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = ld(r, e, d, i, !1);
                  const F = n.listen(_, s, i);
                  f.push(i, F), c && c.push(s, v, y, y + 1);
                }
              } else
                (i = ld(r, e, d, i, !0)),
                  _.addEventListener(s, i, o),
                  f.push(i),
                  c && c.push(s, v, y, o);
            } else i = ld(r, e, d, i, !1);
            const p = r.outputs;
            let m;
            if (h && null !== p && (m = p[s])) {
              const g = m.length;
              if (g)
                for (let _ = 0; _ < g; _ += 2) {
                  const se = e[m[_]][m[_ + 1]].subscribe(i),
                    ae = f.length;
                  f.push(i, se), c && c.push(s, r.index, ae, -(ae + 1));
                }
            }
          })(i, s, s[H], o, t, e, !!n, r),
          _n
        );
      }
      function Ty(t, e, n, r) {
        try {
          return !1 !== n(r);
        } catch (s) {
          return Am(t, s), !1;
        }
      }
      function ld(t, e, n, r, s) {
        return function i(o) {
          if (o === Function) return r;
          const a = 2 & t.flags ? mt(t.index, e) : e;
          0 == (32 & e[2]) && Uc(a);
          let l = Ty(e, 0, r, o),
            u = i.__ngNextListenerFn__;
          for (; u; ) (l = Ty(e, 0, u, o) && l), (u = u.__ngNextListenerFn__);
          return s && !1 === l && (o.preventDefault(), (o.returnValue = !1)), l;
        };
      }
      function ee(t, e = "") {
        const n = E(),
          r = Y(),
          s = t + 20,
          i = r.firstCreatePass ? vs(r, s, 1, e, null) : r.data[s],
          o = (n[s] = (function (t, e) {
            return be(t) ? t.createText(e) : t.createTextNode(e);
          })(n[H], e));
        Ca(r, n, o, i), cn(i, !1);
      }
      function La(t, e, n) {
        const r = E(),
          s = (function (t, e, n, r) {
            return Ge(t, ls(), n) ? e + $(n) + r : V;
          })(r, t, e, n);
        return s !== V && kn(r, nt(), s), La;
      }
      const Fr = void 0;
      var LI = [
        "en",
        [["a", "p"], ["AM", "PM"], Fr],
        [["AM", "PM"], Fr, Fr],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        Fr,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        Fr,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Fr, "{1} 'at' {0}", Fr],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          const e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Bs = {};
      function y_(t) {
        return (
          t in Bs ||
            (Bs[t] =
              ne.ng &&
              ne.ng.common &&
              ne.ng.common.locales &&
              ne.ng.common.locales[t]),
          Bs[t]
        );
      }
      var T = (() => (
        ((T = T || {})[(T.LocaleId = 0)] = "LocaleId"),
        (T[(T.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
        (T[(T.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
        (T[(T.DaysFormat = 3)] = "DaysFormat"),
        (T[(T.DaysStandalone = 4)] = "DaysStandalone"),
        (T[(T.MonthsFormat = 5)] = "MonthsFormat"),
        (T[(T.MonthsStandalone = 6)] = "MonthsStandalone"),
        (T[(T.Eras = 7)] = "Eras"),
        (T[(T.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
        (T[(T.WeekendRange = 9)] = "WeekendRange"),
        (T[(T.DateFormat = 10)] = "DateFormat"),
        (T[(T.TimeFormat = 11)] = "TimeFormat"),
        (T[(T.DateTimeFormat = 12)] = "DateTimeFormat"),
        (T[(T.NumberSymbols = 13)] = "NumberSymbols"),
        (T[(T.NumberFormats = 14)] = "NumberFormats"),
        (T[(T.CurrencyCode = 15)] = "CurrencyCode"),
        (T[(T.CurrencySymbol = 16)] = "CurrencySymbol"),
        (T[(T.CurrencyName = 17)] = "CurrencyName"),
        (T[(T.Currencies = 18)] = "Currencies"),
        (T[(T.Directionality = 19)] = "Directionality"),
        (T[(T.PluralCase = 20)] = "PluralCase"),
        (T[(T.ExtraData = 21)] = "ExtraData"),
        T
      ))();
      const Va = "en-US";
      let __ = Va;
      function fd(t) {
        ht(t, "Expected localeId to be defined"),
          "string" == typeof t && (__ = t.toLowerCase().replace(/_/g, "-"));
      }
      class H_ {}
      const z_ = "ngComponent";
      class VA {
        resolveComponentFactory(e) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${W(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e[z_] = t), e;
          })(e);
        }
      }
      let kr = (() => {
        class t {}
        return (t.NULL = new VA()), t;
      })();
      function Ha(...t) {}
      function Us(t, e) {
        return new Dt(gt(t, e));
      }
      const $A = function () {
        return Us(xe(), E());
      };
      let Dt = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = $A), t;
      })();
      class Lr {}
      let Cd = (() => {
        class t {}
        return (
          (t.ɵprov = U({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class za {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const G_ = new za("12.2.17");
      class Q_ {
        constructor() {}
        supports(e) {
          return zi(e);
        }
        create(e) {
          return new GA(e);
        }
      }
      const WA = (t, e) => e;
      class GA {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || WA);
        }
        forEachItem(e) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) e(n);
        }
        forEachOperation(e) {
          let n = this._itHead,
            r = this._removalsHead,
            s = 0,
            i = null;
          for (; n || r; ) {
            const o = !r || (n && n.currentIndex < Z_(r, s, i)) ? n : r,
              a = Z_(o, s, i),
              l = o.currentIndex;
            if (o === r) s--, (r = r._nextRemoved);
            else if (((n = n._next), null == o.previousIndex)) s++;
            else {
              i || (i = []);
              const u = a - s,
                c = l - s;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < u && (i[f] = h + 1);
                }
                i[o.previousIndex] = c - u;
              }
            }
            a !== l && e(o, a, l);
          }
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            e(n);
        }
        diff(e) {
          if ((null == e && (e = []), !zi(e)))
            throw new Error(
              `Error trying to diff '${W(
                e
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let s,
            i,
            o,
            n = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (i = e[a]),
                (o = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, o)
                  ? (r && (n = this._verifyReinsertion(n, i, o, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, o, a)), (r = !0)),
                (n = n._next);
          } else
            (s = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[As()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (o = this._trackByFn(s, a)),
                  null !== n && Object.is(n.trackById, o)
                    ? (r && (n = this._verifyReinsertion(n, a, o, s)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, o, s)), (r = !0)),
                  (n = n._next),
                  s++;
              }),
              (this.length = s);
          return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, n, r, s) {
          let i;
          return (
            null === e ? (i = this._itTail) : ((i = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._reinsertAfter(e, i, s))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, s))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._moveAfter(e, i, s))
              : (e = this._addAfter(new QA(n, r), i, s)),
            e
          );
        }
        _verifyReinsertion(e, n, r, s) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (e = this._reinsertAfter(i, e._prev, s))
              : e.currentIndex != s &&
                ((e.currentIndex = s), this._addToMoves(e, s)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const n = e._next;
            this._addToRemovals(this._unlink(e)), (e = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const s = e._prevRemoved,
            i = e._nextRemoved;
          return (
            null === s ? (this._removalsHead = i) : (s._nextRemoved = i),
            null === i ? (this._removalsTail = s) : (i._prevRemoved = s),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, n, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, n, r) {
          return (
            this._insertAfter(e, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, n, r) {
          const s = null === n ? this._itHead : n._next;
          return (
            (e._next = s),
            (e._prev = n),
            null === s ? (this._itTail = e) : (s._prev = e),
            null === n ? (this._itHead = e) : (n._next = e),
            null === this._linkedRecords && (this._linkedRecords = new K_()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const n = e._prev,
            r = e._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            e
          );
        }
        _addToMoves(e, n) {
          return (
            e.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new K_()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, n) {
          return (
            (e.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class QA {
        constructor(e, n) {
          (this.item = e),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class KA {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const n = e._prevDup,
            r = e._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class K_ {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const n = e.trackById;
          let r = this.map.get(n);
          r || ((r = new KA()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
          const s = this.map.get(e);
          return s ? s.get(e, n) : null;
        }
        remove(e) {
          const n = e.trackById;
          return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Z_(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class Y_ {
        constructor() {}
        supports(e) {
          return e instanceof Map || ed(e);
        }
        create() {
          return new ZA();
        }
      }
      class ZA {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(e) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) e(n);
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachChangedItem(e) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        diff(e) {
          if (e) {
            if (!(e instanceof Map || ed(e)))
              throw new Error(
                `Error trying to diff '${W(
                  e
                )}'. Only maps and objects are allowed`
              );
          } else e = new Map();
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(e, (r, s) => {
              if (n && n.key === s)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const i = this._getOrCreateRecordForKey(s, r);
                n = this._insertBeforeOrAppend(n, i);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(e, n) {
          if (e) {
            const r = e._prev;
            return (
              (n._next = e),
              (n._prev = r),
              (e._prev = n),
              r && (r._next = n),
              e === this._mapHead && (this._mapHead = n),
              (this._appendAfter = e),
              e
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(e, n) {
          if (this._records.has(e)) {
            const s = this._records.get(e);
            this._maybeAddToChanges(s, n);
            const i = s._prev,
              o = s._next;
            return (
              i && (i._next = o),
              o && (o._prev = i),
              (s._next = null),
              (s._prev = null),
              s
            );
          }
          const r = new YA(e);
          return (
            this._records.set(e, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              this._previousMapHead = this._mapHead, e = this._previousMapHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._changesHead; null !== e; e = e._nextChanged)
              e.previousValue = e.currentValue;
            for (e = this._additionsHead; null != e; e = e._nextAdded)
              e.previousValue = e.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(e, n) {
          Object.is(n, e.currentValue) ||
            ((e.previousValue = e.currentValue),
            (e.currentValue = n),
            this._addToChanges(e));
        }
        _addToAdditions(e) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = e)
            : ((this._additionsTail._nextAdded = e), (this._additionsTail = e));
        }
        _addToChanges(e) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = e)
            : ((this._changesTail._nextChanged = e), (this._changesTail = e));
        }
        _forEach(e, n) {
          e instanceof Map
            ? e.forEach(n)
            : Object.keys(e).forEach((r) => n(e[r], r));
        }
      }
      class YA {
        constructor(e) {
          (this.key = e),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function J_() {
        return new Ji([new Q_()]);
      }
      let Ji = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const s = r.factories.slice();
              n = n.concat(s);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || J_()),
              deps: [[t, new nr(), new ut()]],
            };
          }
          find(n) {
            const r = this.factories.find((s) => s.supports(n));
            if (null != r) return r;
            throw new Error(
              `Cannot find a differ supporting object '${n}' of type '${(function (
                t
              ) {
                return t.name || typeof t;
              })(n)}'`
            );
          }
        }
        return (t.ɵprov = U({ token: t, providedIn: "root", factory: J_ })), t;
      })();
      function X_() {
        return new Hs([new Y_()]);
      }
      let Hs = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (r) {
              const s = r.factories.slice();
              n = n.concat(s);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || X_()),
              deps: [[t, new nr(), new ut()]],
            };
          }
          find(n) {
            const r = this.factories.find((s) => s.supports(n));
            if (r) return r;
            throw new Error(`Cannot find a differ supporting object '${n}'`);
          }
        }
        return (t.ɵprov = U({ token: t, providedIn: "root", factory: X_ })), t;
      })();
      function Wa(t, e, n, r, s = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && r.push(Me(i)), qt(i)))
            for (let a = 10; a < i.length; a++) {
              const l = i[a],
                u = l[1].firstChild;
              null !== u && Wa(l[1], l, u, r);
            }
          const o = n.type;
          if (8 & o) Wa(t, e, n.child, r);
          else if (32 & o) {
            const a = ac(n, e);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & o) {
            const a = Sg(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Fi(e[16]);
              Wa(l[1], l, a, r, !0);
            }
          }
          n = s ? n.projectionNext : n.next;
        }
        return r;
      }
      class Xi {
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const e = this._lView,
            n = e[1];
          return Wa(n, e, n.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        set context(e) {
          this._lView[8] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[3];
            if (qt(e)) {
              const n = e[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (fc(e, r), Ir(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          mg(this._lView[1], this._lView);
        }
        onDestroy(e) {
          !(function (t, e, n, r) {
            const s = Sm(e);
            null === n
              ? s.push(r)
              : (s.push(n), t.firstCreatePass && Tm(t).push(r, s.length - 1));
          })(this._lView[1], this._lView, null, e);
        }
        markForCheck() {
          Uc(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          qc(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            ea(!0);
            try {
              qc(t, e, n);
            } finally {
              ea(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function (t, e) {
              ki(t, e, e[H], 2, null, null);
            })(this._lView[1], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = e;
        }
      }
      class XA extends Xi {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          wm(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            ea(!0);
            try {
              wm(t);
            } finally {
              ea(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const tM = function (t) {
        return (function (t, e, n) {
          if (Zo(t) && !n) {
            const r = mt(t.index, e);
            return new Xi(r, r);
          }
          return 47 & t.type ? new Xi(e[16], e) : null;
        })(xe(), E(), 16 == (16 & t));
      };
      let Dd = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = tM), t;
      })();
      const sM = [new Y_()],
        oM = new Ji([new Q_()]),
        aM = new Hs(sM),
        uM = function () {
          return (function (t, e) {
            return 4 & t.type ? new dM(e, t, Us(t, e)) : null;
          })(xe(), E());
        };
      let Vn = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = uM), t;
      })();
      const cM = Vn,
        dM = class extends cM {
          constructor(e, n, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(e) {
            const n = this._declarationTContainer.tViews,
              r = Bi(
                this._declarationLView,
                n,
                e,
                16,
                null,
                n.declTNode,
                null,
                null,
                null,
                null
              );
            r[17] = this._declarationLView[this._declarationTContainer.index];
            const i = this._declarationLView[19];
            return (
              null !== i && (r[19] = i.createEmbeddedView(n)),
              $i(n, r, e),
              new Xi(r)
            );
          }
        };
      class Dn {}
      class e0 {}
      const pM = function () {
        return (function (t, e) {
          let n;
          const r = e[t.index];
          if (qt(r)) n = r;
          else {
            let s;
            if (8 & t.type) s = Me(r);
            else {
              const i = e[H];
              s = i.createComment("");
              const o = gt(t, e);
              Mr(
                i,
                Ea(i, o),
                s,
                (function (t, e) {
                  return be(t) ? t.nextSibling(e) : e.nextSibling;
                })(i, o),
                !1
              );
            }
            (e[t.index] = n = bm(r, e, s, t)), Ra(e, n);
          }
          return new t0(n, t, e);
        })(xe(), E());
      };
      let Jt = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = pM), t;
      })();
      const mM = Jt,
        t0 = class extends mM {
          constructor(e, n, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Us(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new ds(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = ua(this._hostTNode, this._hostLView);
            if (Bp(e)) {
              const n = cs(e, this._hostLView),
                r = us(e);
              return new ds(n[1].data[r + 8], n);
            }
            return new ds(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const n = n0(this._lContainer);
            return (null !== n && n[e]) || null;
          }
          get length() {
            return this._lContainer.length - 10;
          }
          createEmbeddedView(e, n, r) {
            const s = e.createEmbeddedView(n || {});
            return this.insert(s, r), s;
          }
          createComponent(e, n, r, s, i) {
            const o = r || this.parentInjector;
            if (!i && null == e.ngModule && o) {
              const l = o.get(Dn, null);
              l && (i = l);
            }
            const a = e.create(o, s, void 0, i);
            return this.insert(a.hostView, n), a;
          }
          insert(e, n) {
            const r = e._lView,
              s = r[1];
            if (
              (function (t) {
                return qt(t[3]);
              })(r)
            ) {
              const c = this.indexOf(e);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[3],
                  f = new t0(d, d[6], d[3]);
                f.detach(f.indexOf(e));
              }
            }
            const i = this._adjustIndex(n),
              o = this._lContainer;
            !(function (t, e, n, r) {
              const s = 10 + r,
                i = n.length;
              r > 0 && (n[s - 1][4] = e),
                r < i - 10
                  ? ((e[4] = n[s]), pa(n, 10 + r, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function (t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(s, r, o, i);
            const a = gc(i, o),
              l = r[H],
              u = Ea(l, o[7]);
            return (
              null !== u &&
                (function (t, e, n, r, s, i) {
                  (r[0] = s), (r[6] = e), ki(t, r, n, 1, s, i);
                })(s, o[6], l, r, u, a),
              e.attachToViewContainerRef(),
              pa(vd(o), i, e),
              e
            );
          }
          move(e, n) {
            return this.insert(e, n);
          }
          indexOf(e) {
            const n = n0(this._lContainer);
            return null !== n ? n.indexOf(e) : -1;
          }
          remove(e) {
            const n = this._adjustIndex(e, -1),
              r = fc(this._lContainer, n);
            r && (Ir(vd(this._lContainer), n), mg(r[1], r));
          }
          detach(e) {
            const n = this._adjustIndex(e, -1),
              r = fc(this._lContainer, n);
            return r && null != Ir(vd(this._lContainer), n) ? new Xi(r) : null;
          }
          _adjustIndex(e, n = 0) {
            return null == e ? this.length + n : e;
          }
        };
      function n0(t) {
        return t[8];
      }
      function vd(t) {
        return t[8] || (t[8] = []);
      }
      const Gs = {};
      class b0 extends kr {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = qe(e);
          return new S0(n, this.ngModule);
        }
      }
      function w0(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const fR = new J("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Wg,
      });
      class S0 extends H_ {
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function (t) {
              return t.map(tS).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        get inputs() {
          return w0(this.componentDef.inputs);
        }
        get outputs() {
          return w0(this.componentDef.outputs);
        }
        create(e, n, r, s) {
          const i = (s = s || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const i = t.get(n, Gs, s);
                      return i !== Gs || r === Gs ? i : e.get(n, r, s);
                    },
                  };
                })(e, s.injector)
              : e,
            o = i.get(Lr, wp),
            a = i.get(Cd, null),
            l = o.createRenderer(null, this.componentDef),
            u = this.componentDef.selectors[0][0] || "div",
            c = r
              ? (function (t, e, n) {
                  if (be(t)) return t.selectRootElement(e, n === Ae.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(l, r, this.componentDef.encapsulation)
              : dc(
                  o.createRenderer(null, this.componentDef),
                  u,
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? vp
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(u)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function (t, e) {
              return {
                components: [],
                scheduler: t || Wg,
                clean: jS,
                playerHandler: e || null,
                flags: 0,
              };
            })(),
            h = Ma(0, null, null, 1, 0, null, null, null, null, null),
            p = Bi(null, h, f, d, null, null, o, l, a, i);
          let m, g;
          ta(p);
          try {
            const _ = (function (t, e, n, r, s, i) {
              const o = n[1];
              n[20] = t;
              const l = vs(o, 20, 2, "#host", null),
                u = (l.mergedAttrs = e.hostAttrs);
              null !== u &&
                (Pa(l, u, !0),
                null !== t &&
                  (oa(s, t, u),
                  null !== l.classes && _c(s, t, l.classes),
                  null !== l.styles && Ig(s, t, l.styles)));
              const c = r.createRenderer(t, e),
                d = Bi(
                  n,
                  fm(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  l,
                  r,
                  c,
                  i || null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (ca(wi(l, n), o, e.type), Cm(o, l), Dm(l, n.length, 1)),
                Ra(n, d),
                (n[20] = d)
              );
            })(c, this.componentDef, p, o, l);
            if (c)
              if (r) oa(l, c, ["ng-version", G_.full]);
              else {
                const { attrs: y, classes: v } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let i = t[r];
                    if ("string" == typeof i)
                      2 === s
                        ? "" !== i && e.push(i, t[++r])
                        : 8 === s && n.push(i);
                    else {
                      if (!Wt(s)) break;
                      s = i;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                y && oa(l, c, y), v && v.length > 0 && _c(l, c, v.join(" "));
              }
            if (((g = ku(h, 20)), void 0 !== n)) {
              const y = (g.projection = []);
              for (let v = 0; v < this.ngContentSelectors.length; v++) {
                const w = n[v];
                y.push(null != w ? Array.from(w) : null);
              }
            }
            (m = (function (t, e, n, r, s) {
              const i = n[1],
                o = (function (t, e, n) {
                  const r = xe();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    vm(t, r, e, bs(t, e, 1, null), n));
                  const s = Si(e, t, r.directiveStart, r);
                  We(s, e);
                  const i = gt(r, e);
                  return i && We(i, e), s;
                })(i, n, e);
              if (
                (r.components.push(o),
                (t[8] = o),
                s && s.forEach((l) => l(o, e)),
                e.contentQueries)
              ) {
                const l = xe();
                e.contentQueries(1, o, l.directiveStart);
              }
              const a = xe();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Xn(a.index),
                  _m(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  Em(e, o)),
                o
              );
            })(_, this.componentDef, p, f, [dT])),
              $i(h, p, null);
          } finally {
            na();
          }
          return new gR(this.componentType, m, Us(g, p), p, g);
        }
      }
      class gR extends class {} {
        constructor(e, n, r, s, i) {
          super(),
            (this.location = r),
            (this._rootLView = s),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new XA(s)),
            (this.componentType = e);
        }
        get injector() {
          return new ds(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      const Qs = new Map();
      class _R extends Dn {
        constructor(e, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new b0(this));
          const r = It(e),
            s = (function (t) {
              return t[mb] || null;
            })(e);
          s && fd(s),
            (this._bootstrapComponents = gn(r.bootstrap)),
            (this._r3Injector = xm(
              e,
              n,
              [
                { provide: Dn, useValue: this },
                { provide: kr, useValue: this.componentFactoryResolver },
              ],
              W(e)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(e));
        }
        get(e, n = oe.THROW_IF_NOT_FOUND, r = P.Default) {
          return e === oe || e === Dn || e === Ss
            ? this
            : this._r3Injector.get(e, n, r);
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class Fd extends e0 {
        constructor(e) {
          super(),
            (this.moduleType = e),
            null !== It(e) &&
              (function (t) {
                const e = new Set();
                !(function n(r) {
                  const s = It(r, !0),
                    i = s.id;
                  null !== i &&
                    ((function (t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${W(
                            e
                          )} vs ${W(e.name)}`
                        );
                    })(i, Qs.get(i), r),
                    Qs.set(i, r));
                  const o = gn(s.imports);
                  for (const a of o) e.has(a) || (e.add(a), n(a));
                })(t);
              })(e);
        }
        create(e) {
          return new _R(this.moduleType, e);
        }
      }
      function kd(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const Ft = class extends An {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, r) {
          var s, i, o;
          let a = e,
            l = n || (() => null),
            u = r;
          if (e && "object" == typeof e) {
            const d = e;
            (a = null === (s = d.next) || void 0 === s ? void 0 : s.bind(d)),
              (l = null === (i = d.error) || void 0 === i ? void 0 : i.bind(d)),
              (u =
                null === (o = d.complete) || void 0 === o ? void 0 : o.bind(d));
          }
          this.__isAsync && ((l = kd(l)), a && (a = kd(a)), u && (u = kd(u)));
          const c = super.subscribe({ next: a, error: l, complete: u });
          return e instanceof De && e.add(c), c;
        }
      };
      Symbol;
      const fo = new J("Application Initializer");
      let Zs = (() => {
        class t {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Ha),
              (this.reject = Ha),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, s) => {
                (this.resolve = r), (this.reject = s);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let s = 0; s < this.appInits.length; s++) {
                const i = this.appInits[s]();
                if (Fa(i)) n.push(i);
                else if (ad(i)) {
                  const o = new Promise((a, l) => {
                    i.subscribe({ complete: a, error: l });
                  });
                  n.push(o);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((s) => {
                this.reject(s);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(fo, 8));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ho = new J("AppId"),
        CP = {
          provide: ho,
          useFactory: function () {
            return `${Zd()}${Zd()}${Zd()}`;
          },
          deps: [],
        };
      function Zd() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const tE = new J("Platform Initializer"),
        Yd = new J("Platform ID"),
        nE = new J("appBootstrapListener");
      let tl = (() => {
        class t {
          log(n) {
            console.log(n);
          }
          warn(n) {
            console.warn(n);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ur = new J("LocaleId"),
        rE = new J("DefaultCurrencyCode");
      class vP {
        constructor(e, n) {
          (this.ngModuleFactory = e), (this.componentFactories = n);
        }
      }
      const Jd = function (t) {
          return new Fd(t);
        },
        bP = Jd,
        wP = function (t) {
          return Promise.resolve(Jd(t));
        },
        sE = function (t) {
          const e = Jd(t),
            r = gn(It(t).declarations).reduce((s, i) => {
              const o = qe(i);
              return o && s.push(new S0(o)), s;
            }, []);
          return new vP(e, r);
        },
        SP = sE,
        TP = function (t) {
          return Promise.resolve(sE(t));
        };
      let Br = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = bP),
              (this.compileModuleAsync = wP),
              (this.compileModuleAndAllComponentsSync = SP),
              (this.compileModuleAndAllComponentsAsync = TP);
          }
          clearCache() {}
          clearCacheFor(n) {}
          getModuleId(n) {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const MP = (() => Promise.resolve(0))();
      function Xd(t) {
        "undefined" == typeof Zone
          ? MP.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Se {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ft(!1)),
            (this.onMicrotaskEmpty = new Ft(!1)),
            (this.onStable = new Ft(!1)),
            (this.onError = new Ft(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const s = this;
          (s._nesting = 0),
            (s._outer = s._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
            (s.shouldCoalesceEventChangeDetection = !r && n),
            (s.shouldCoalesceRunChangeDetection = r),
            (s.lastRequestAnimationFrameId = -1),
            (s.nativeRequestAnimationFrame = (function () {
              let t = ne.requestAnimationFrame,
                e = ne.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e = () => {
                !(function (t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(ne, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                tf(t),
                                (t.isCheckStableRunning = !0),
                                ef(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    tf(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, s, i, o, a) => {
                  try {
                    return iE(t), n.invokeTask(s, i, o, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      oE(t);
                  }
                },
                onInvoke: (n, r, s, i, o, a, l) => {
                  try {
                    return iE(t), n.invoke(s, i, o, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), oE(t);
                  }
                },
                onHasTask: (n, r, s, i) => {
                  n.hasTask(s, i),
                    r === s &&
                      ("microTask" == i.change
                        ? ((t._hasPendingMicrotasks = i.microTask),
                          tf(t),
                          ef(t))
                        : "macroTask" == i.change &&
                          (t.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, s, i) => (
                  n.handleError(s, i),
                  t.runOutsideAngular(() => t.onError.emit(i)),
                  !1
                ),
              });
            })(s);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Se.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Se.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(e, n, r) {
          return this._inner.run(e, n, r);
        }
        runTask(e, n, r, s) {
          const i = this._inner,
            o = i.scheduleEventTask("NgZoneEvent: " + s, e, PP, Ha, Ha);
          try {
            return i.runTask(o, n, r);
          } finally {
            i.cancelTask(o);
          }
        }
        runGuarded(e, n, r) {
          return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const PP = {};
      function ef(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function tf(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function iE(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function oE(t) {
        t._nesting--, ef(t);
      }
      class OP {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Ft()),
            (this.onMicrotaskEmpty = new Ft()),
            (this.onStable = new Ft()),
            (this.onError = new Ft());
        }
        run(e, n, r) {
          return e.apply(n, r);
        }
        runGuarded(e, n, r) {
          return e.apply(n, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, r, s) {
          return e.apply(n, r);
        }
      }
      let nf = (() => {
          class t {
            constructor(n) {
              (this._ngZone = n),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Se.assertNotInAngularZone(),
                        Xd(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Xd(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, s) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (o) => o.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: s });
            }
            whenStable(n, r, s) {
              if (s && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, s), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(n, r, s) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(Se));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        aE = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), rf.addToWindow(this);
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return rf.findTestabilityInTree(this, n, r);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class FP {
        addToWindow(e) {}
        findTestabilityInTree(e, n, r) {
          return null;
        }
      }
      let rf = new FP(),
        lE = !0,
        uE = !1;
      let tn;
      const dE = new J("AllowMultipleToken");
      class sf {
        constructor(e, n) {
          (this.name = e), (this.token = n);
        }
      }
      function fE(t, e, n = []) {
        const r = `Platform: ${e}`,
          s = new J(r);
        return (i = []) => {
          let o = hE();
          if (!o || o.injector.get(dE, !1))
            if (t) t(n.concat(i).concat({ provide: s, useValue: !0 }));
            else {
              const a = n
                .concat(i)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: Ui, useValue: "platform" }
                );
              !(function (t) {
                if (tn && !tn.destroyed && !tn.injector.get(dE, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                tn = t.get(pE);
                const e = t.get(tE, null);
                e && e.forEach((n) => n());
              })(oe.create({ providers: a, name: r }));
            }
          return (function (t) {
            const e = hE();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function hE() {
        return tn && !tn.destroyed ? tn : null;
      }
      let pE = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const a = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new OP()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Se({
                          enableLongStackTrace: ((uE = !0), lE),
                          shouldCoalesceEventChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == e
                            ? void 0
                            : e.ngZoneRunCoalescing),
                        })),
                  n
                );
              })(r ? r.ngZone : void 0, {
                ngZoneEventCoalescing: (r && r.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (r && r.ngZoneRunCoalescing) || !1,
              }),
              l = [{ provide: Se, useValue: a }];
            return a.run(() => {
              const u = oe.create({
                  providers: l,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                c = n.create(u),
                d = c.injector.get(xr, null);
              if (!d)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (h) => {
                      d.handleError(h);
                    },
                  });
                  c.onDestroy(() => {
                    of(this._modules, c), f.unsubscribe();
                  });
                }),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return Fa(r)
                      ? r.catch((s) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(s)), s)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(d, a, () => {
                  const f = c.injector.get(Zs);
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        fd(c.injector.get(ur, Va) || Va),
                        this._moduleDoBootstrap(c),
                        c
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const s = gE({}, r);
            return (function (t, e, n) {
              const r = new Fd(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, s));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Ys);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((s) => r.bootstrap(s));
            else {
              if (!n.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${W(
                    n.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((n) => n.destroy()),
              this._destroyListeners.forEach((n) => n()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(oe));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function gE(t, e) {
        return Array.isArray(e)
          ? e.reduce(gE, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Ys = (() => {
        class t {
          constructor(n, r, s, i, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = s),
              (this._componentFactoryResolver = i),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const a = new ye((u) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    u.next(this._stable), u.complete();
                  });
              }),
              l = new ye((u) => {
                let c;
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Se.assertNotInAngularZone(),
                      Xd(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), u.next(!0));
                      });
                  });
                });
                const d = this._zone.onUnstable.subscribe(() => {
                  Se.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        u.next(!1);
                      }));
                });
                return () => {
                  c.unsubscribe(), d.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                $o(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof ye
                  ? t[0]
                  : mi(e)(Eu(t, n))
              );
            })(
              a,
              l.pipe((t) =>
                Cu()(
                  (function (t, e) {
                    return function (r) {
                      let s;
                      s =
                        "function" == typeof t
                          ? t
                          : function () {
                              return t;
                            };
                      const i = Object.create(r, Yv);
                      return (i.source = r), (i.subjectFactory = s), i;
                    };
                  })(nb)(t)
                )
              )
            );
          }
          bootstrap(n, r) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let s;
            (s =
              n instanceof H_
                ? n
                : this._componentFactoryResolver.resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const i = (function (t) {
                return t.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Dn),
              a = s.create(oe.NULL, [], r || s.selector, i),
              l = a.location.nativeElement,
              u = a.injector.get(nf, null),
              c = u && a.injector.get(aE);
            return (
              u && c && c.registerApplication(l, u),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  of(this.components, a),
                  c && c.unregisterApplication(l);
              }),
              this._loadComponent(a),
              a
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            of(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView),
              this.tick(),
              this.components.push(n),
              this._injector
                .get(nE, [])
                .concat(this._bootstrapListeners)
                .forEach((s) => s(n));
          }
          ngOnDestroy() {
            this._views.slice().forEach((n) => n.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Se), b(oe), b(xr), b(kr), b(Zs));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function of(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class rl {}
      class ZP {}
      const YP = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let JP = (() => {
        class t {
          constructor(n, r) {
            (this._compiler = n), (this._config = r || YP);
          }
          load(n) {
            return this.loadAndCompile(n);
          }
          loadAndCompile(n) {
            let [r, s] = n.split("#");
            return (
              void 0 === s && (s = "default"),
              pi(255)(r)
                .then((i) => i[s])
                .then((i) => EE(i, r, s))
                .then((i) => this._compiler.compileModuleAsync(i))
            );
          }
          loadFactory(n) {
            let [r, s] = n.split("#"),
              i = "NgFactory";
            return (
              void 0 === s && ((s = "default"), (i = "")),
              pi(255)(
                this._config.factoryPathPrefix +
                  r +
                  this._config.factoryPathSuffix
              )
                .then((o) => o[s + i])
                .then((o) => EE(o, r, s))
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Br), b(ZP, 8));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function EE(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const lx = fE(null, "core", [
          { provide: Yd, useValue: "unknown" },
          { provide: pE, deps: [oe] },
          { provide: aE, deps: [] },
          { provide: tl, deps: [] },
        ]),
        hx = [
          { provide: Ys, useClass: Ys, deps: [Se, oe, xr, kr, Zs] },
          {
            provide: fR,
            deps: [Se],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (n) {
                  e.push(n);
                }
              );
            },
          },
          { provide: Zs, useClass: Zs, deps: [[new ut(), fo]] },
          { provide: Br, useClass: Br, deps: [] },
          CP,
          {
            provide: Ji,
            useFactory: function () {
              return oM;
            },
            deps: [],
          },
          {
            provide: Hs,
            useFactory: function () {
              return aM;
            },
            deps: [],
          },
          {
            provide: ur,
            useFactory: function (t) {
              return (
                fd(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Va)
                ),
                t
              );
            },
            deps: [[new _s(ur), new ut(), new nr()]],
          },
          { provide: rE, useValue: "USD" },
        ];
      let gx = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(Ys));
            }),
            (t.ɵmod = xn({ type: t })),
            (t.ɵinj = Ut({ providers: hx })),
            t
          );
        })(),
        hl = null;
      function dr() {
        return hl;
      }
      const Fe = new J("DocumentToken");
      let Hr = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = U({ factory: pN, token: t, providedIn: "platform" })),
          t
        );
      })();
      function pN() {
        return b(HE);
      }
      const gN = new J("Location Initialized");
      let HE = (() => {
        class t extends Hr {
          constructor(n) {
            super(), (this._doc = n), this._init();
          }
          _init() {
            (this.location = window.location), (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return dr().getBaseHref(this._doc);
          }
          onPopState(n) {
            const r = dr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("popstate", n, !1),
              () => r.removeEventListener("popstate", n)
            );
          }
          onHashChange(n) {
            const r = dr().getGlobalEventTarget(this._doc, "window");
            return (
              r.addEventListener("hashchange", n, !1),
              () => r.removeEventListener("hashchange", n)
            );
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(n) {
            this.location.pathname = n;
          }
          pushState(n, r, s) {
            qE() ? this._history.pushState(n, r, s) : (this.location.hash = s);
          }
          replaceState(n, r, s) {
            qE()
              ? this._history.replaceState(n, r, s)
              : (this.location.hash = s);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(n = 0) {
            this._history.go(n);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Fe));
          }),
          (t.ɵprov = U({ factory: mN, token: t, providedIn: "platform" })),
          t
        );
      })();
      function qE() {
        return !!window.history.pushState;
      }
      function mN() {
        return new HE(b(Fe));
      }
      function Df(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function zE(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function Bn(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let ei = (() => {
        class t {
          historyGo(n) {
            throw new Error("Not implemented");
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = U({ factory: yN, token: t, providedIn: "root" })),
          t
        );
      })();
      function yN(t) {
        const e = b(Fe).location;
        return new WE(b(Hr), (e && e.origin) || "");
      }
      const vf = new J("appBaseHref");
      let WE = (() => {
          class t extends ei {
            constructor(n, r) {
              if (
                (super(),
                (this._platformLocation = n),
                (this._removeListenerFns = []),
                null == r && (r = this._platformLocation.getBaseHrefFromDOM()),
                null == r)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = r;
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(n) {
              return Df(this._baseHref, n);
            }
            path(n = !1) {
              const r =
                  this._platformLocation.pathname +
                  Bn(this._platformLocation.search),
                s = this._platformLocation.hash;
              return s && n ? `${r}${s}` : r;
            }
            pushState(n, r, s, i) {
              const o = this.prepareExternalUrl(s + Bn(i));
              this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, s, i) {
              const o = this.prepareExternalUrl(s + Bn(i));
              this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, s;
              null === (s = (r = this._platformLocation).historyGo) ||
                void 0 === s ||
                s.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(Hr), b(vf, 8));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        _N = (() => {
          class t extends ei {
            constructor(n, r) {
              super(),
                (this._platformLocation = n),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != r && (this._baseHref = r);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(n) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(n),
                this._platformLocation.onHashChange(n)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(n = !1) {
              let r = this._platformLocation.hash;
              return null == r && (r = "#"), r.length > 0 ? r.substring(1) : r;
            }
            prepareExternalUrl(n) {
              const r = Df(this._baseHref, n);
              return r.length > 0 ? "#" + r : r;
            }
            pushState(n, r, s, i) {
              let o = this.prepareExternalUrl(s + Bn(i));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.pushState(n, r, o);
            }
            replaceState(n, r, s, i) {
              let o = this.prepareExternalUrl(s + Bn(i));
              0 == o.length && (o = this._platformLocation.pathname),
                this._platformLocation.replaceState(n, r, o);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            historyGo(n = 0) {
              var r, s;
              null === (s = (r = this._platformLocation).historyGo) ||
                void 0 === s ||
                s.call(r, n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(Hr), b(vf, 8));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        pl = (() => {
          class t {
            constructor(n, r) {
              (this._subject = new Ft()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = n);
              const s = this._platformStrategy.getBaseHref();
              (this._platformLocation = r),
                (this._baseHref = zE(GE(s))),
                this._platformStrategy.onPopState((i) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: i.state,
                    type: i.type,
                  });
                });
            }
            path(n = !1) {
              return this.normalize(this._platformStrategy.path(n));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(n, r = "") {
              return this.path() == this.normalize(n + Bn(r));
            }
            normalize(n) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, GE(n))
              );
            }
            prepareExternalUrl(n) {
              return (
                n && "/" !== n[0] && (n = "/" + n),
                this._platformStrategy.prepareExternalUrl(n)
              );
            }
            go(n, r = "", s = null) {
              this._platformStrategy.pushState(s, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Bn(r)),
                  s
                );
            }
            replaceState(n, r = "", s = null) {
              this._platformStrategy.replaceState(s, "", n, r),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(n + Bn(r)),
                  s
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            historyGo(n = 0) {
              var r, s;
              null === (s = (r = this._platformStrategy).historyGo) ||
                void 0 === s ||
                s.call(r, n);
            }
            onUrlChange(n) {
              this._urlChangeListeners.push(n),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((r) => {
                    this._notifyUrlChangeListeners(r.url, r.state);
                  }));
            }
            _notifyUrlChangeListeners(n = "", r) {
              this._urlChangeListeners.forEach((s) => s(n, r));
            }
            subscribe(n, r, s) {
              return this._subject.subscribe({
                next: n,
                error: r,
                complete: s,
              });
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(ei), b(Hr));
            }),
            (t.normalizeQueryParams = Bn),
            (t.joinWithSlash = Df),
            (t.stripTrailingSlash = zE),
            (t.ɵprov = U({ factory: EN, token: t, providedIn: "root" })),
            t
          );
        })();
      function EN() {
        return new pl(b(ei), b(Hr));
      }
      function GE(t) {
        return t.replace(/\/index.html$/, "");
      }
      var Re = (() => (
        ((Re = Re || {})[(Re.Zero = 0)] = "Zero"),
        (Re[(Re.One = 1)] = "One"),
        (Re[(Re.Two = 2)] = "Two"),
        (Re[(Re.Few = 3)] = "Few"),
        (Re[(Re.Many = 4)] = "Many"),
        (Re[(Re.Other = 5)] = "Other"),
        Re
      ))();
      const IN = function (t) {
        return (function (t) {
          const e = (function (t) {
            return t.toLowerCase().replace(/_/g, "-");
          })(t);
          let n = y_(e);
          if (n) return n;
          const r = e.split("-")[0];
          if (((n = y_(r)), n)) return n;
          if ("en" === r) return LI;
          throw new Error(`Missing locale data for the locale "${t}".`);
        })(t)[T.PluralCase];
      };
      class wl {}
      let nO = (() => {
        class t extends wl {
          constructor(n) {
            super(), (this.locale = n);
          }
          getPluralCategory(n, r) {
            switch (IN(r || this.locale)(n)) {
              case Re.Zero:
                return "zero";
              case Re.One:
                return "one";
              case Re.Two:
                return "two";
              case Re.Few:
                return "few";
              case Re.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(ur));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Pf {
        constructor(e, n) {
          (this._viewContainerRef = e),
            (this._templateRef = n),
            (this._created = !1);
        }
        create() {
          (this._created = !0),
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        }
        destroy() {
          (this._created = !1), this._viewContainerRef.clear();
        }
        enforceState(e) {
          e && !this._created
            ? this.create()
            : !e && this._created && this.destroy();
        }
      }
      let Sl = (() => {
          class t {
            constructor() {
              (this._defaultUsed = !1),
                (this._caseCount = 0),
                (this._lastCaseCheckIndex = 0),
                (this._lastCasesMatched = !1);
            }
            set ngSwitch(n) {
              (this._ngSwitch = n),
                0 === this._caseCount && this._updateDefaultCases(!0);
            }
            _addCase() {
              return this._caseCount++;
            }
            _addDefault(n) {
              this._defaultViews || (this._defaultViews = []),
                this._defaultViews.push(n);
            }
            _matchCase(n) {
              const r = n == this._ngSwitch;
              return (
                (this._lastCasesMatched = this._lastCasesMatched || r),
                this._lastCaseCheckIndex++,
                this._lastCaseCheckIndex === this._caseCount &&
                  (this._updateDefaultCases(!this._lastCasesMatched),
                  (this._lastCaseCheckIndex = 0),
                  (this._lastCasesMatched = !1)),
                r
              );
            }
            _updateDefaultCases(n) {
              if (this._defaultViews && n !== this._defaultUsed) {
                this._defaultUsed = n;
                for (let r = 0; r < this._defaultViews.length; r++)
                  this._defaultViews[r].enforceState(n);
              }
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵdir = He({
              type: t,
              selectors: [["", "ngSwitch", ""]],
              inputs: { ngSwitch: "ngSwitch" },
            })),
            t
          );
        })(),
        sC = (() => {
          class t {
            constructor(n, r, s) {
              (this.ngSwitch = s), s._addCase(), (this._view = new Pf(n, r));
            }
            ngDoCheck() {
              this._view.enforceState(
                this.ngSwitch._matchCase(this.ngSwitchCase)
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(M(Jt), M(Vn), M(Sl, 9));
            }),
            (t.ɵdir = He({
              type: t,
              selectors: [["", "ngSwitchCase", ""]],
              inputs: { ngSwitchCase: "ngSwitchCase" },
            })),
            t
          );
        })(),
        iC = (() => {
          class t {
            constructor(n, r, s) {
              s._addDefault(new Pf(n, r));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(M(Jt), M(Vn), M(Sl, 9));
            }),
            (t.ɵdir = He({
              type: t,
              selectors: [["", "ngSwitchDefault", ""]],
            })),
            t
          );
        })(),
        OO = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = xn({ type: t })),
            (t.ɵinj = Ut({ providers: [{ provide: wl, useClass: nO }] })),
            t
          );
        })();
      let uC = (() => {
        class t {}
        return (
          (t.ɵprov = U({
            token: t,
            providedIn: "root",
            factory: () => new VO(b(Fe), window),
          })),
          t
        );
      })();
      class VO {
        constructor(e, n) {
          (this.document = e), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(e) {
          this.offset = Array.isArray(e) ? () => e : e;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(e) {
          this.supportsScrolling() && this.window.scrollTo(e[0], e[1]);
        }
        scrollToAnchor(e) {
          if (!this.supportsScrolling()) return;
          const n = (function (t, e) {
            const n = t.getElementById(e) || t.getElementsByName(e)[0];
            if (n) return n;
            if (
              "function" == typeof t.createTreeWalker &&
              t.body &&
              (t.body.createShadowRoot || t.body.attachShadow)
            ) {
              const r = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT);
              let s = r.currentNode;
              for (; s; ) {
                const i = s.shadowRoot;
                if (i) {
                  const o =
                    i.getElementById(e) || i.querySelector(`[name="${e}"]`);
                  if (o) return o;
                }
                s = r.nextNode();
              }
            }
            return null;
          })(this.document, e);
          n && (this.scrollToElement(n), this.attemptFocus(n));
        }
        setHistoryScrollRestoration(e) {
          if (this.supportScrollRestoration()) {
            const n = this.window.history;
            n && n.scrollRestoration && (n.scrollRestoration = e);
          }
        }
        scrollToElement(e) {
          const n = e.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            s = n.top + this.window.pageYOffset,
            i = this.offset();
          this.window.scrollTo(r - i[0], s - i[1]);
        }
        attemptFocus(e) {
          return e.focus(), this.document.activeElement === e;
        }
        supportScrollRestoration() {
          try {
            if (!this.supportsScrolling()) return !1;
            const e =
              cC(this.window.history) ||
              cC(Object.getPrototypeOf(this.window.history));
            return !(!e || (!e.writable && !e.set));
          } catch (e) {
            return !1;
          }
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch (e) {
            return !1;
          }
        }
      }
      function cC(t) {
        return Object.getOwnPropertyDescriptor(t, "scrollRestoration");
      }
      class Of extends class extends class {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      } {
        static makeCurrent() {
          !(function (t) {
            hl || (hl = t);
          })(new Of());
        }
        onAndCancel(e, n, r) {
          return (
            e.addEventListener(n, r, !1),
            () => {
              e.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n =
            ((Co = Co || document.querySelector("base")),
            Co ? Co.getAttribute("href") : null);
          return null == n
            ? null
            : (function (t) {
                (Tl = Tl || document.createElement("a")),
                  Tl.setAttribute("href", t);
                const e = Tl.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          Co = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function (t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const r = n.indexOf("="),
                [s, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (s.trim() === e) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let Tl,
        Co = null;
      const dC = new J("TRANSITION_ID"),
        zO = [
          {
            provide: fo,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Zs).donePromise.then(() => {
                  const r = dr(),
                    s = e.querySelectorAll(`style[ng-transition="${t}"]`);
                  for (let i = 0; i < s.length; i++) r.remove(s[i]);
                });
              };
            },
            deps: [dC, Fe, oe],
            multi: !0,
          },
        ];
      class Ff {
        static init() {
          !(function (t) {
            rf = t;
          })(new Ff());
        }
        addToWindow(e) {
          (ne.getAngularTestability = (r, s = !0) => {
            const i = e.findTestabilityInTree(r, s);
            if (null == i)
              throw new Error("Could not find testability for element.");
            return i;
          }),
            (ne.getAllAngularTestabilities = () => e.getAllTestabilities()),
            (ne.getAllAngularRootElements = () => e.getAllRootElements()),
            ne.frameworkStabilizers || (ne.frameworkStabilizers = []),
            ne.frameworkStabilizers.push((r) => {
              const s = ne.getAllAngularTestabilities();
              let i = s.length,
                o = !1;
              const a = function (l) {
                (o = o || l), i--, 0 == i && r(o);
              };
              s.forEach(function (l) {
                l.whenStable(a);
              });
            });
        }
        findTestabilityInTree(e, n, r) {
          if (null == n) return null;
          const s = e.getTestability(n);
          return null != s
            ? s
            : r
            ? dr().isShadowRoot(n)
              ? this.findTestabilityInTree(e, n.host, !0)
              : this.findTestabilityInTree(e, n.parentElement, !0)
            : null;
        }
      }
      let WO = (() => {
        class t {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Do = new J("EventManagerPlugins");
      let Al = (() => {
        class t {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((s) => (s.manager = this)),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, s) {
            return this._findPluginFor(r).addEventListener(n, r, s);
          }
          addGlobalEventListener(n, r, s) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, s);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const s = this._plugins;
            for (let i = 0; i < s.length; i++) {
              const o = s[i];
              if (o.supports(n)) return this._eventNameToPlugin.set(n, o), o;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Do), b(Se));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class kf {
        constructor(e) {
          this._doc = e;
        }
        addGlobalEventListener(e, n, r) {
          const s = dr().getGlobalEventTarget(this._doc, e);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${n}`);
          return this.addEventListener(s, n, r);
        }
      }
      let hC = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(n) {
              const r = new Set();
              n.forEach((s) => {
                this._stylesSet.has(s) || (this._stylesSet.add(s), r.add(s));
              }),
                this.onStylesAdded(r);
            }
            onStylesAdded(n) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        vo = (() => {
          class t extends hC {
            constructor(n) {
              super(),
                (this._doc = n),
                (this._hostNodes = new Map()),
                this._hostNodes.set(n.head, []);
            }
            _addStylesToHost(n, r, s) {
              n.forEach((i) => {
                const o = this._doc.createElement("style");
                (o.textContent = i), s.push(r.appendChild(o));
              });
            }
            addHost(n) {
              const r = [];
              this._addStylesToHost(this._stylesSet, n, r),
                this._hostNodes.set(n, r);
            }
            removeHost(n) {
              const r = this._hostNodes.get(n);
              r && r.forEach(pC), this._hostNodes.delete(n);
            }
            onStylesAdded(n) {
              this._hostNodes.forEach((r, s) => {
                this._addStylesToHost(n, s, r);
              });
            }
            ngOnDestroy() {
              this._hostNodes.forEach((n) => n.forEach(pC));
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(Fe));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      function pC(t) {
        dr().remove(t);
      }
      const Lf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Vf = /%COMP%/g;
      function Ml(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Ml(t, s, n) : ((s = s.replace(Vf, t)), n.push(s));
        }
        return n;
      }
      function yC(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Rl = (() => {
        class t {
          constructor(n, r, s) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = s),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new jf(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            switch (r.encapsulation) {
              case Ae.Emulated: {
                let s = this.rendererByCompId.get(r.id);
                return (
                  s ||
                    ((s = new aF(
                      this.eventManager,
                      this.sharedStylesHost,
                      r,
                      this.appId
                    )),
                    this.rendererByCompId.set(r.id, s)),
                  s.applyToHost(n),
                  s
                );
              }
              case 1:
              case Ae.ShadowDom:
                return new lF(this.eventManager, this.sharedStylesHost, n, r);
              default:
                if (!this.rendererByCompId.has(r.id)) {
                  const s = Ml(r.id, r.styles, []);
                  this.sharedStylesHost.addStyles(s),
                    this.rendererByCompId.set(r.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Al), b(vo), b(ho));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class jf {
        constructor(e) {
          (this.eventManager = e), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? document.createElementNS(Lf[n] || n, e)
            : document.createElement(e);
        }
        createComment(e) {
          return document.createComment(e);
        }
        createText(e) {
          return document.createTextNode(e);
        }
        appendChild(e, n) {
          e.appendChild(n);
        }
        insertBefore(e, n, r) {
          e && e.insertBefore(n, r);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let r = "string" == typeof e ? document.querySelector(e) : e;
          if (!r)
            throw new Error(`The selector "${e}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, r, s) {
          if (s) {
            n = s + ":" + n;
            const i = Lf[s];
            i ? e.setAttributeNS(i, n, r) : e.setAttribute(n, r);
          } else e.setAttribute(n, r);
        }
        removeAttribute(e, n, r) {
          if (r) {
            const s = Lf[r];
            s ? e.removeAttributeNS(s, n) : e.removeAttribute(`${r}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, r, s) {
          s & (_t.DashCase | _t.Important)
            ? e.style.setProperty(n, r, s & _t.Important ? "important" : "")
            : (e.style[n] = r);
        }
        removeStyle(e, n, r) {
          r & _t.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, r) {
          e[n] = r;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, r) {
          return "string" == typeof e
            ? this.eventManager.addGlobalEventListener(e, n, yC(r))
            : this.eventManager.addEventListener(e, n, yC(r));
        }
      }
      class aF extends jf {
        constructor(e, n, r, s) {
          super(e), (this.component = r);
          const i = Ml(s + "-" + r.id, r.styles, []);
          n.addStyles(i),
            (this.contentAttr = (function (t) {
              return "_ngcontent-%COMP%".replace(Vf, t);
            })(s + "-" + r.id)),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Vf, t);
            })(s + "-" + r.id));
        }
        applyToHost(e) {
          super.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const r = super.createElement(e, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      class lF extends jf {
        constructor(e, n, r, s) {
          super(e),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = Ml(s.id, s.styles, []);
          for (let o = 0; o < i.length; o++) {
            const a = document.createElement("style");
            (a.textContent = i[o]), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
      }
      let uF = (() => {
        class t extends kf {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, s) {
            return (
              n.addEventListener(r, s, !1),
              () => this.removeEventListener(n, r, s)
            );
          }
          removeEventListener(n, r, s) {
            return n.removeEventListener(r, s);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Fe));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const CC = ["alt", "control", "meta", "shift"],
        mF = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        DC = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        yF = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let _F = (() => {
        class t extends kf {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, r, s) {
            const i = t.parseEventName(r),
              o = t.eventCallback(i.fullKey, s, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => dr().onAndCancel(n, i.domEventName, o));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              s = r.shift();
            if (0 === r.length || ("keydown" !== s && "keyup" !== s))
              return null;
            const i = t._normalizeKey(r.pop());
            let o = "";
            if (
              (CC.forEach((l) => {
                const u = r.indexOf(l);
                u > -1 && (r.splice(u, 1), (o += l + "."));
              }),
              (o += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const a = {};
            return (a.domEventName = s), (a.fullKey = o), a;
          }
          static getEventFullKey(n) {
            let r = "",
              s = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && DC.hasOwnProperty(e) && (e = DC[e]));
                }
                return mF[e] || e;
              })(n);
            return (
              (s = s.toLowerCase()),
              " " === s ? (s = "space") : "." === s && (s = "dot"),
              CC.forEach((i) => {
                i != s && yF[i](n) && (r += i + ".");
              }),
              (r += s),
              r
            );
          }
          static eventCallback(n, r, s) {
            return (i) => {
              t.getEventFullKey(i) === n && s.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Fe));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const wF = [
          { provide: Yd, useValue: "browser" },
          {
            provide: tE,
            useValue: function () {
              Of.makeCurrent(), Ff.init();
            },
            multi: !0,
          },
          {
            provide: Fe,
            useFactory: function () {
              return (
                (function (t) {
                  Ou = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ],
        TF = fE(lx, "browser", wF),
        IF = [
          [],
          { provide: Ui, useValue: "root" },
          {
            provide: xr,
            useFactory: function () {
              return new xr();
            },
            deps: [],
          },
          { provide: Do, useClass: uF, multi: !0, deps: [Fe, Se, Yd] },
          { provide: Do, useClass: _F, multi: !0, deps: [Fe] },
          [],
          { provide: Rl, useClass: Rl, deps: [Al, vo, ho] },
          { provide: Lr, useExisting: Rl },
          { provide: hC, useExisting: vo },
          { provide: vo, useClass: vo, deps: [Fe] },
          { provide: nf, useClass: nf, deps: [Se] },
          { provide: Al, useClass: Al, deps: [Do, Se] },
          { provide: class {}, useClass: WO, deps: [] },
          [],
        ];
      let Hf = (() => {
        class t {
          constructor(n) {
            if (n)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [
                { provide: ho, useValue: n.appId },
                { provide: dC, useExisting: ho },
                zO,
              ],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(t, 12));
          }),
          (t.ɵmod = xn({ type: t })),
          (t.ɵinj = Ut({ providers: IF, imports: [OO, gx] })),
          t
        );
      })();
      function q(...t) {
        let e = t[t.length - 1];
        return $o(e) ? (t.pop(), gu(t, e)) : Eu(t);
      }
      "undefined" != typeof window && window;
      class an extends An {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const n = super._subscribe(e);
          return n && !n.closed && e.next(this._value), n;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new ts();
          return this._value;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      class FF extends me {
        notifyNext(e, n, r, s, i) {
          this.destination.next(n);
        }
        notifyError(e, n) {
          this.destination.error(e);
        }
        notifyComplete(e) {
          this.destination.complete();
        }
      }
      class kF extends me {
        constructor(e, n, r) {
          super(),
            (this.parent = e),
            (this.outerValue = n),
            (this.outerIndex = r),
            (this.index = 0);
        }
        _next(e) {
          this.parent.notifyNext(
            this.outerValue,
            e,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(e) {
          this.parent.notifyError(e, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      function LF(t, e, n, r, s = new kF(t, n, r)) {
        if (!s.closed) return e instanceof ye ? e.subscribe(s) : pu(e)(s);
      }
      const bC = {};
      class jF {
        constructor(e) {
          this.resultSelector = e;
        }
        call(e, n) {
          return n.subscribe(new BF(e, this.resultSelector));
        }
      }
      class BF extends FF {
        constructor(e, n) {
          super(e),
            (this.resultSelector = n),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(e) {
          this.values.push(bC), this.observables.push(e);
        }
        _complete() {
          const e = this.observables,
            n = e.length;
          if (0 === n) this.destination.complete();
          else {
            (this.active = n), (this.toRespond = n);
            for (let r = 0; r < n; r++) this.add(LF(this, e[r], void 0, r));
          }
        }
        notifyComplete(e) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(e, n, r) {
          const s = this.values,
            o = this.toRespond
              ? s[r] === bC
                ? --this.toRespond
                : this.toRespond
              : 0;
          (s[r] = n),
            0 === o &&
              (this.resultSelector
                ? this._tryResultSelector(s)
                : this.destination.next(s.slice()));
        }
        _tryResultSelector(e) {
          let n;
          try {
            n = this.resultSelector.apply(this, e);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.destination.next(n);
        }
      }
      const Pl = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function zf(...t) {
        return mi(1)(q(...t));
      }
      const ti = new ye((t) => t.complete());
      function Wf(t) {
        return t
          ? (function (t) {
              return new ye((e) => t.schedule(() => e.complete()));
            })(t)
          : ti;
      }
      function wC(t) {
        return new ye((e) => {
          let n;
          try {
            n = t();
          } catch (s) {
            return void e.error(s);
          }
          return (n ? Je(n) : Wf()).subscribe(e);
        });
      }
      function hr(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(
                hr((r, s) => Je(t(r, s)).pipe(fe((i, o) => e(r, i, s, o))))
              )
          : (n) => n.lift(new HF(t));
      }
      class HF {
        constructor(e) {
          this.project = e;
        }
        call(e, n) {
          return n.subscribe(new qF(e, this.project));
        }
      }
      class qF extends yu {
        constructor(e, n) {
          super(e), (this.project = n), (this.index = 0);
        }
        _next(e) {
          let n;
          const r = this.index++;
          try {
            n = this.project(e, r);
          } catch (s) {
            return void this.destination.error(s);
          }
          this._innerSub(n);
        }
        _innerSub(e) {
          const n = this.innerSubscription;
          n && n.unsubscribe();
          const r = new mu(this),
            s = this.destination;
          s.add(r),
            (this.innerSubscription = _u(e, r)),
            this.innerSubscription !== r && s.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: e } = this;
          (!e || e.closed) && super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(e) {
          this.destination.next(e);
        }
      }
      const SC = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "argument out of range"),
            (this.name = "ArgumentOutOfRangeError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function Gf(t) {
        return (e) => (0 === t ? Wf() : e.lift(new zF(t)));
      }
      class zF {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new SC();
        }
        call(e, n) {
          return n.subscribe(new WF(e, this.total));
        }
      }
      class WF extends me {
        constructor(e, n) {
          super(e), (this.total = n), (this.count = 0);
        }
        _next(e) {
          const n = this.total,
            r = ++this.count;
          r <= n &&
            (this.destination.next(e),
            r === n && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function TC(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (s) {
            return s.lift(new QF(t, e, n));
          }
        );
      }
      class QF {
        constructor(e, n, r = !1) {
          (this.accumulator = e), (this.seed = n), (this.hasSeed = r);
        }
        call(e, n) {
          return n.subscribe(
            new KF(e, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class KF extends me {
        constructor(e, n, r, s) {
          super(e),
            (this.accumulator = n),
            (this._seed = r),
            (this.hasSeed = s),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(e) {
          (this.hasSeed = !0), (this._seed = e);
        }
        _next(e) {
          if (this.hasSeed) return this._tryNext(e);
          (this.seed = e), this.destination.next(e);
        }
        _tryNext(e) {
          const n = this.index++;
          let r;
          try {
            r = this.accumulator(this.seed, e, n);
          } catch (s) {
            this.destination.error(s);
          }
          (this.seed = r), this.destination.next(r);
        }
      }
      function ni(t, e) {
        return function (r) {
          return r.lift(new ZF(t, e));
        };
      }
      class ZF {
        constructor(e, n) {
          (this.predicate = e), (this.thisArg = n);
        }
        call(e, n) {
          return n.subscribe(new YF(e, this.predicate, this.thisArg));
        }
      }
      class YF extends me {
        constructor(e, n, r) {
          super(e), (this.predicate = n), (this.thisArg = r), (this.count = 0);
        }
        _next(e) {
          let n;
          try {
            n = this.predicate.call(this.thisArg, e, this.count++);
          } catch (r) {
            return void this.destination.error(r);
          }
          n && this.destination.next(e);
        }
      }
      function qr(t) {
        return function (n) {
          const r = new JF(t),
            s = n.lift(r);
          return (r.caught = s);
        };
      }
      class JF {
        constructor(e) {
          this.selector = e;
        }
        call(e, n) {
          return n.subscribe(new XF(e, this.selector, this.caught));
        }
      }
      class XF extends yu {
        constructor(e, n, r) {
          super(e), (this.selector = n), (this.caught = r);
        }
        error(e) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(e, this.caught);
            } catch (i) {
              return void super.error(i);
            }
            this._unsubscribeAndRecycle();
            const r = new mu(this);
            this.add(r);
            const s = _u(n, r);
            s !== r && this.add(s);
          }
        }
      }
      function bo(t, e) {
        return $e(t, e, 1);
      }
      function Qf(t) {
        return function (n) {
          return 0 === t ? Wf() : n.lift(new e2(t));
        };
      }
      class e2 {
        constructor(e) {
          if (((this.total = e), this.total < 0)) throw new SC();
        }
        call(e, n) {
          return n.subscribe(new t2(e, this.total));
        }
      }
      class t2 extends me {
        constructor(e, n) {
          super(e),
            (this.total = n),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(e) {
          const n = this.ring,
            r = this.total,
            s = this.count++;
          n.length < r ? n.push(e) : (n[s % r] = e);
        }
        _complete() {
          const e = this.destination;
          let n = this.count;
          if (n > 0) {
            const r = this.count >= this.total ? this.total : this.count,
              s = this.ring;
            for (let i = 0; i < r; i++) {
              const o = n++ % r;
              e.next(s[o]);
            }
          }
          e.complete();
        }
      }
      function IC(t = s2) {
        return (e) => e.lift(new n2(t));
      }
      class n2 {
        constructor(e) {
          this.errorFactory = e;
        }
        call(e, n) {
          return n.subscribe(new r2(e, this.errorFactory));
        }
      }
      class r2 extends me {
        constructor(e, n) {
          super(e), (this.errorFactory = n), (this.hasValue = !1);
        }
        _next(e) {
          (this.hasValue = !0), this.destination.next(e);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (n) {
              e = n;
            }
            this.destination.error(e);
          }
        }
      }
      function s2() {
        return new Pl();
      }
      function AC(t = null) {
        return (e) => e.lift(new i2(t));
      }
      class i2 {
        constructor(e) {
          this.defaultValue = e;
        }
        call(e, n) {
          return n.subscribe(new o2(e, this.defaultValue));
        }
      }
      class o2 extends me {
        constructor(e, n) {
          super(e), (this.defaultValue = n), (this.isEmpty = !0);
        }
        _next(e) {
          (this.isEmpty = !1), this.destination.next(e);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function ri(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? ni((s, i) => t(s, i, r)) : Bo,
            Gf(1),
            n ? AC(e) : IC(() => new Pl())
          );
      }
      function pr() {}
      function vt(t, e, n) {
        return function (s) {
          return s.lift(new l2(t, e, n));
        };
      }
      class l2 {
        constructor(e, n, r) {
          (this.nextOrObserver = e), (this.error = n), (this.complete = r);
        }
        call(e, n) {
          return n.subscribe(
            new u2(e, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class u2 extends me {
        constructor(e, n, r, s) {
          super(e),
            (this._tapNext = pr),
            (this._tapError = pr),
            (this._tapComplete = pr),
            (this._tapError = r || pr),
            (this._tapComplete = s || pr),
            In(n)
              ? ((this._context = this), (this._tapNext = n))
              : n &&
                ((this._context = n),
                (this._tapNext = n.next || pr),
                (this._tapError = n.error || pr),
                (this._tapComplete = n.complete || pr));
        }
        _next(e) {
          try {
            this._tapNext.call(this._context, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
        _error(e) {
          try {
            this._tapError.call(this._context, e);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.error(e);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (e) {
            return void this.destination.error(e);
          }
          return this.destination.complete();
        }
      }
      class d2 {
        constructor(e) {
          this.callback = e;
        }
        call(e, n) {
          return n.subscribe(new f2(e, this.callback));
        }
      }
      class f2 extends me {
        constructor(e, n) {
          super(e), this.add(new De(n));
        }
      }
      class Un {
        constructor(e, n) {
          (this.id = e), (this.url = n);
        }
      }
      class Kf extends Un {
        constructor(e, n, r = "imperative", s = null) {
          super(e, n), (this.navigationTrigger = r), (this.restoredState = s);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class wo extends Un {
        constructor(e, n, r) {
          super(e, n), (this.urlAfterRedirects = r);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class MC extends Un {
        constructor(e, n, r) {
          super(e, n), (this.reason = r);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class h2 extends Un {
        constructor(e, n, r) {
          super(e, n), (this.error = r);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class p2 extends Un {
        constructor(e, n, r, s) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = s);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class g2 extends Un {
        constructor(e, n, r, s) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = s);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class m2 extends Un {
        constructor(e, n, r, s, i) {
          super(e, n),
            (this.urlAfterRedirects = r),
            (this.state = s),
            (this.shouldActivate = i);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class y2 extends Un {
        constructor(e, n, r, s) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = s);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class _2 extends Un {
        constructor(e, n, r, s) {
          super(e, n), (this.urlAfterRedirects = r), (this.state = s);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class RC {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class PC {
        constructor(e) {
          this.route = e;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class E2 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class C2 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class D2 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class v2 {
        constructor(e) {
          this.snapshot = e;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class xC {
        constructor(e, n, r) {
          (this.routerEvent = e), (this.position = n), (this.anchor = r);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      const Q = "primary";
      class b2 {
        constructor(e) {
          this.params = e || {};
        }
        has(e) {
          return Object.prototype.hasOwnProperty.call(this.params, e);
        }
        get(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(e) {
          if (this.has(e)) {
            const n = this.params[e];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function si(t) {
        return new b2(t);
      }
      const NC = "ngNavigationCancelingError";
      function Zf(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e[NC] = !0), e;
      }
      function S2(t, e, n) {
        const r = n.path.split("/");
        if (
          r.length > t.length ||
          ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
        )
          return null;
        const s = {};
        for (let i = 0; i < r.length; i++) {
          const o = r[i],
            a = t[i];
          if (o.startsWith(":")) s[o.substring(1)] = a;
          else if (o !== a.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      function vn(t, e) {
        const n = t ? Object.keys(t) : void 0,
          r = e ? Object.keys(e) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let i = 0; i < n.length; i++)
          if (((s = n[i]), !OC(t[s], e[s]))) return !1;
        return !0;
      }
      function OC(t, e) {
        if (Array.isArray(t) && Array.isArray(e)) {
          if (t.length !== e.length) return !1;
          const n = [...t].sort(),
            r = [...e].sort();
          return n.every((s, i) => r[i] === s);
        }
        return t === e;
      }
      function FC(t) {
        return Array.prototype.concat.apply([], t);
      }
      function kC(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function Ue(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function bn(t) {
        return ad(t) ? t : Fa(t) ? Je(Promise.resolve(t)) : q(t);
      }
      const A2 = {
          exact: function jC(t, e, n) {
            if (
              !Wr(t.segments, e.segments) ||
              !xl(t.segments, e.segments, n) ||
              t.numberOfChildren !== e.numberOfChildren
            )
              return !1;
            for (const r in e.children)
              if (!t.children[r] || !jC(t.children[r], e.children[r], n))
                return !1;
            return !0;
          },
          subset: BC,
        },
        LC = {
          exact: function (t, e) {
            return vn(t, e);
          },
          subset: function (t, e) {
            return (
              Object.keys(e).length <= Object.keys(t).length &&
              Object.keys(e).every((n) => OC(t[n], e[n]))
            );
          },
          ignored: () => !0,
        };
      function VC(t, e, n) {
        return (
          A2[n.paths](t.root, e.root, n.matrixParams) &&
          LC[n.queryParams](t.queryParams, e.queryParams) &&
          !("exact" === n.fragment && t.fragment !== e.fragment)
        );
      }
      function BC(t, e, n) {
        return $C(t, e, e.segments, n);
      }
      function $C(t, e, n, r) {
        if (t.segments.length > n.length) {
          const s = t.segments.slice(0, n.length);
          return !(!Wr(s, n) || e.hasChildren() || !xl(s, n, r));
        }
        if (t.segments.length === n.length) {
          if (!Wr(t.segments, n) || !xl(t.segments, n, r)) return !1;
          for (const s in e.children)
            if (!t.children[s] || !BC(t.children[s], e.children[s], r))
              return !1;
          return !0;
        }
        {
          const s = n.slice(0, t.segments.length),
            i = n.slice(t.segments.length);
          return (
            !!(Wr(t.segments, s) && xl(t.segments, s, r) && t.children[Q]) &&
            $C(t.children[Q], e, i, r)
          );
        }
      }
      function xl(t, e, n) {
        return e.every((r, s) => LC[n](t[s].parameters, r.parameters));
      }
      class zr {
        constructor(e, n, r) {
          (this.root = e), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = si(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return N2.serialize(this);
        }
      }
      class Z {
        constructor(e, n) {
          (this.segments = e),
            (this.children = n),
            (this.parent = null),
            Ue(n, (r, s) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Nl(this);
        }
      }
      class So {
        constructor(e, n) {
          (this.path = e), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = si(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return zC(this);
        }
      }
      function Wr(t, e) {
        return t.length === e.length && t.every((n, r) => n.path === e[r].path);
      }
      class Yf {}
      class UC {
        parse(e) {
          const n = new U2(e);
          return new zr(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(e) {
          const n = `/${To(e.root, !0)}`,
            r = (function (t) {
              const e = Object.keys(t)
                .map((n) => {
                  const r = t[n];
                  return Array.isArray(r)
                    ? r.map((s) => `${Ol(n)}=${Ol(s)}`).join("&")
                    : `${Ol(n)}=${Ol(r)}`;
                })
                .filter((n) => !!n);
              return e.length ? `?${e.join("&")}` : "";
            })(e.queryParams),
            s =
              "string" == typeof e.fragment
                ? `#${(function (t) {
                    return encodeURI(t);
                  })(e.fragment)}`
                : "";
          return `${n}${r}${s}`;
        }
      }
      const N2 = new UC();
      function Nl(t) {
        return t.segments.map((e) => zC(e)).join("/");
      }
      function To(t, e) {
        if (!t.hasChildren()) return Nl(t);
        if (e) {
          const n = t.children[Q] ? To(t.children[Q], !1) : "",
            r = [];
          return (
            Ue(t.children, (s, i) => {
              i !== Q && r.push(`${i}:${To(s, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function (t, e) {
            let n = [];
            return (
              Ue(t.children, (r, s) => {
                s === Q && (n = n.concat(e(r, s)));
              }),
              Ue(t.children, (r, s) => {
                s !== Q && (n = n.concat(e(r, s)));
              }),
              n
            );
          })(t, (r, s) =>
            s === Q ? [To(t.children[Q], !1)] : [`${s}:${To(r, !1)}`]
          );
          return 1 === Object.keys(t.children).length && null != t.children[Q]
            ? `${Nl(t)}/${n[0]}`
            : `${Nl(t)}/(${n.join("//")})`;
        }
      }
      function HC(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Ol(t) {
        return HC(t).replace(/%3B/gi, ";");
      }
      function Jf(t) {
        return HC(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Fl(t) {
        return decodeURIComponent(t);
      }
      function qC(t) {
        return Fl(t.replace(/\+/g, "%20"));
      }
      function zC(t) {
        return `${Jf(t.path)}${(function (t) {
          return Object.keys(t)
            .map((e) => `;${Jf(e)}=${Jf(t[e])}`)
            .join("");
        })(t.parameters)}`;
      }
      const L2 = /^[^\/()?;=#]+/;
      function kl(t) {
        const e = t.match(L2);
        return e ? e[0] : "";
      }
      const V2 = /^[^=?&#]+/,
        B2 = /^[^?&#]+/;
      class U2 {
        constructor(e) {
          (this.url = e), (this.remaining = e);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new Z([], {})
              : new Z([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const e = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(e);
            } while (this.consumeOptional("&"));
          return e;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const e = [];
          for (
            this.peekStartsWith("(") || e.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), e.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (e.length > 0 || Object.keys(n).length > 0) && (r[Q] = new Z(e, n)),
            r
          );
        }
        parseSegment() {
          const e = kl(this.remaining);
          if ("" === e && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(e), new So(Fl(e), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const e = {};
          for (; this.consumeOptional(";"); ) this.parseParam(e);
          return e;
        }
        parseParam(e) {
          const n = kl(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const s = kl(this.remaining);
            s && ((r = s), this.capture(r));
          }
          e[Fl(n)] = Fl(r);
        }
        parseQueryParam(e) {
          const n = (function (t) {
            const e = t.match(V2);
            return e ? e[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = (function (t) {
              const e = t.match(B2);
              return e ? e[0] : "";
            })(this.remaining);
            o && ((r = o), this.capture(r));
          }
          const s = qC(n),
            i = qC(r);
          if (e.hasOwnProperty(s)) {
            let o = e[s];
            Array.isArray(o) || ((o = [o]), (e[s] = o)), o.push(i);
          } else e[s] = i;
        }
        parseParens(e) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = kl(this.remaining),
              s = this.remaining[r.length];
            if ("/" !== s && ")" !== s && ";" !== s)
              throw new Error(`Cannot parse url '${this.url}'`);
            let i;
            r.indexOf(":") > -1
              ? ((i = r.substr(0, r.indexOf(":"))),
                this.capture(i),
                this.capture(":"))
              : e && (i = Q);
            const o = this.parseChildren();
            (n[i] = 1 === Object.keys(o).length ? o[Q] : new Z([], o)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(e) {
          return this.remaining.startsWith(e);
        }
        consumeOptional(e) {
          return (
            !!this.peekStartsWith(e) &&
            ((this.remaining = this.remaining.substring(e.length)), !0)
          );
        }
        capture(e) {
          if (!this.consumeOptional(e)) throw new Error(`Expected "${e}".`);
        }
      }
      class WC {
        constructor(e) {
          this._root = e;
        }
        get root() {
          return this._root.value;
        }
        parent(e) {
          const n = this.pathFromRoot(e);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(e) {
          const n = Xf(e, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(e) {
          const n = Xf(e, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(e) {
          const n = eh(e, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((s) => s.value)
                .filter((s) => s !== e);
        }
        pathFromRoot(e) {
          return eh(e, this._root).map((n) => n.value);
        }
      }
      function Xf(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const r = Xf(t, n);
          if (r) return r;
        }
        return null;
      }
      function eh(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = eh(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Hn {
        constructor(e, n) {
          (this.value = e), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Io(t) {
        const e = {};
        return t && t.children.forEach((n) => (e[n.value.outlet] = n)), e;
      }
      class GC extends WC {
        constructor(e, n) {
          super(e), (this.snapshot = n), th(this, e);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function QC(t, e) {
        const n = (function (t, e) {
            const o = new Ll([], {}, {}, "", {}, Q, e, null, t.root, -1, {});
            return new ZC("", new Hn(o, []));
          })(t, e),
          r = new an([new So("", {})]),
          s = new an({}),
          i = new an({}),
          o = new an({}),
          a = new an(""),
          l = new ii(r, s, o, a, i, Q, e, n.root);
        return (l.snapshot = n.root), new GC(new Hn(l, []), n);
      }
      class ii {
        constructor(e, n, r, s, i, o, a, l) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = s),
            (this.data = i),
            (this.outlet = o),
            (this.component = a),
            (this._futureSnapshot = l);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(fe((e) => si(e)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(fe((e) => si(e)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function KC(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const s = n[r],
              i = n[r - 1];
            if (s.routeConfig && "" === s.routeConfig.path) r--;
            else {
              if (i.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (e, n) => ({
              params: Object.assign(Object.assign({}, e.params), n.params),
              data: Object.assign(Object.assign({}, e.data), n.data),
              resolve: Object.assign(
                Object.assign({}, e.resolve),
                n._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ll {
        constructor(e, n, r, s, i, o, a, l, u, c, d) {
          (this.url = e),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = s),
            (this.data = i),
            (this.outlet = o),
            (this.component = a),
            (this.routeConfig = l),
            (this._urlSegment = u),
            (this._lastPathIndex = c),
            (this._resolve = d);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = si(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = si(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class ZC extends WC {
        constructor(e, n) {
          super(n), (this.url = e), th(this, n);
        }
        toString() {
          return YC(this._root);
        }
      }
      function th(t, e) {
        (e.value._routerState = t), e.children.forEach((n) => th(t, n));
      }
      function YC(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(YC).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function nh(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            vn(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            vn(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!vn(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            vn(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function rh(t, e) {
        const n =
          vn(t.params, e.params) &&
          (function (t, e) {
            return (
              Wr(t, e) && t.every((n, r) => vn(n.parameters, e[r].parameters))
            );
          })(t.url, e.url);
        return (
          n &&
          !(!t.parent != !e.parent) &&
          (!t.parent || rh(t.parent, e.parent))
        );
      }
      function Vl(t, e, n) {
        if (n && t.shouldReuseRoute(e.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = e.value;
          const s = (function (t, e, n) {
            return e.children.map((r) => {
              for (const s of n.children)
                if (t.shouldReuseRoute(r.value, s.value.snapshot))
                  return Vl(t, r, s);
              return Vl(t, r);
            });
          })(t, e, n);
          return new Hn(r, s);
        }
        {
          if (t.shouldAttach(e.value)) {
            const i = t.retrieve(e.value);
            if (null !== i) {
              const o = i.route;
              return JC(e, o), o;
            }
          }
          const r = (function (t) {
              return new ii(
                new an(t.url),
                new an(t.params),
                new an(t.queryParams),
                new an(t.fragment),
                new an(t.data),
                t.outlet,
                t.component,
                t
              );
            })(e.value),
            s = e.children.map((i) => Vl(t, i));
          return new Hn(r, s);
        }
      }
      function JC(t, e) {
        if (t.value.routeConfig !== e.value.routeConfig)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot created from a different route"
          );
        if (t.children.length !== e.children.length)
          throw new Error(
            "Cannot reattach ActivatedRouteSnapshot with a different number of children"
          );
        e.value._futureSnapshot = t.value;
        for (let n = 0; n < t.children.length; ++n)
          JC(t.children[n], e.children[n]);
      }
      function jl(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function Ao(t) {
        return "object" == typeof t && null != t && t.outlets;
      }
      function sh(t, e, n, r, s) {
        let i = {};
        return (
          r &&
            Ue(r, (o, a) => {
              i[a] = Array.isArray(o) ? o.map((l) => `${l}`) : `${o}`;
            }),
          new zr(n.root === t ? e : XC(n.root, t, e), i, s)
        );
      }
      function XC(t, e, n) {
        const r = {};
        return (
          Ue(t.children, (s, i) => {
            r[i] = s === e ? n : XC(s, e, n);
          }),
          new Z(t.segments, r)
        );
      }
      class eD {
        constructor(e, n, r) {
          if (
            ((this.isAbsolute = e),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            e && r.length > 0 && jl(r[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const s = r.find(Ao);
          if (s && s !== kC(r))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class ih {
        constructor(e, n, r) {
          (this.segmentGroup = e), (this.processChildren = n), (this.index = r);
        }
      }
      function tD(t, e, n) {
        if (
          (t || (t = new Z([], {})), 0 === t.segments.length && t.hasChildren())
        )
          return Bl(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const i = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return i;
              const o = t.segments[s],
                a = n[r];
              if (Ao(a)) break;
              const l = `${a}`,
                u = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === l) break;
              if (l && u && "object" == typeof u && void 0 === u.outlets) {
                if (!rD(l, u, o)) return i;
                r += 2;
              } else {
                if (!rD(l, {}, o)) return i;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const i = new Z(t.segments.slice(0, r.pathIndex), {});
          return (
            (i.children[Q] = new Z(t.segments.slice(r.pathIndex), t.children)),
            Bl(i, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new Z(t.segments, {})
          : r.match && !t.hasChildren()
          ? oh(t, e, n)
          : r.match
          ? Bl(t, 0, s)
          : oh(t, e, n);
      }
      function Bl(t, e, n) {
        if (0 === n.length) return new Z(t.segments, {});
        {
          const r = (function (t) {
              return Ao(t[0]) ? t[0].outlets : { [Q]: t };
            })(n),
            s = {};
          return (
            Ue(r, (i, o) => {
              "string" == typeof i && (i = [i]),
                null !== i && (s[o] = tD(t.children[o], e, i));
            }),
            Ue(t.children, (i, o) => {
              void 0 === r[o] && (s[o] = i);
            }),
            new Z(t.segments, s)
          );
        }
      }
      function oh(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          const i = n[s];
          if (Ao(i)) {
            const l = ek(i.outlets);
            return new Z(r, l);
          }
          if (0 === s && jl(n[0])) {
            r.push(new So(t.segments[e].path, nD(n[0]))), s++;
            continue;
          }
          const o = Ao(i) ? i.outlets[Q] : `${i}`,
            a = s < n.length - 1 ? n[s + 1] : null;
          o && a && jl(a)
            ? (r.push(new So(o, nD(a))), (s += 2))
            : (r.push(new So(o, {})), s++);
        }
        return new Z(r, {});
      }
      function ek(t) {
        const e = {};
        return (
          Ue(t, (n, r) => {
            "string" == typeof n && (n = [n]),
              null !== n && (e[r] = oh(new Z([], {}), 0, n));
          }),
          e
        );
      }
      function nD(t) {
        const e = {};
        return Ue(t, (n, r) => (e[r] = `${n}`)), e;
      }
      function rD(t, e, n) {
        return t == n.path && vn(e, n.parameters);
      }
      class nk {
        constructor(e, n, r, s) {
          (this.routeReuseStrategy = e),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = s);
        }
        activate(e) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, e),
            nh(this.futureState.root),
            this.activateChildRoutes(n, r, e);
        }
        deactivateChildRoutes(e, n, r) {
          const s = Io(n);
          e.children.forEach((i) => {
            const o = i.value.outlet;
            this.deactivateRoutes(i, s[o], r), delete s[o];
          }),
            Ue(s, (i, o) => {
              this.deactivateRouteAndItsChildren(i, r);
            });
        }
        deactivateRoutes(e, n, r) {
          const s = e.value,
            i = n ? n.value : null;
          if (s === i)
            if (s.component) {
              const o = r.getContext(s.outlet);
              o && this.deactivateChildRoutes(e, n, o.children);
            } else this.deactivateChildRoutes(e, n, r);
          else i && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(e, n) {
          this.routeReuseStrategy.shouldDetach(e.value.snapshot)
            ? this.detachAndStoreRouteSubtree(e, n)
            : this.deactivateRouteAndOutlet(e, n);
        }
        detachAndStoreRouteSubtree(e, n) {
          const r = n.getContext(e.value.outlet);
          if (r && r.outlet) {
            const s = r.outlet.detach(),
              i = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(e.value.snapshot, {
              componentRef: s,
              route: e,
              contexts: i,
            });
          }
        }
        deactivateRouteAndOutlet(e, n) {
          const r = n.getContext(e.value.outlet),
            s = r && e.value.component ? r.children : n,
            i = Io(e);
          for (const o of Object.keys(i))
            this.deactivateRouteAndItsChildren(i[o], s);
          r &&
            r.outlet &&
            (r.outlet.deactivate(),
            r.children.onOutletDeactivated(),
            (r.attachRef = null),
            (r.resolver = null),
            (r.route = null));
        }
        activateChildRoutes(e, n, r) {
          const s = Io(n);
          e.children.forEach((i) => {
            this.activateRoutes(i, s[i.value.outlet], r),
              this.forwardEvent(new v2(i.value.snapshot));
          }),
            e.children.length && this.forwardEvent(new C2(e.value.snapshot));
        }
        activateRoutes(e, n, r) {
          const s = e.value,
            i = n ? n.value : null;
          if ((nh(s), s === i))
            if (s.component) {
              const o = r.getOrCreateContext(s.outlet);
              this.activateChildRoutes(e, n, o.children);
            } else this.activateChildRoutes(e, n, r);
          else if (s.component) {
            const o = r.getOrCreateContext(s.outlet);
            if (this.routeReuseStrategy.shouldAttach(s.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(s.snapshot);
              this.routeReuseStrategy.store(s.snapshot, null),
                o.children.onOutletReAttached(a.contexts),
                (o.attachRef = a.componentRef),
                (o.route = a.route.value),
                o.outlet && o.outlet.attach(a.componentRef, a.route.value),
                sD(a.route);
            } else {
              const a = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const n = e.routeConfig;
                    if (n && n._loadedConfig) return n._loadedConfig;
                    if (n && n.component) return null;
                  }
                  return null;
                })(s.snapshot),
                l = a ? a.module.componentFactoryResolver : null;
              (o.attachRef = null),
                (o.route = s),
                (o.resolver = l),
                o.outlet && o.outlet.activateWith(s, l),
                this.activateChildRoutes(e, null, o.children);
            }
          } else this.activateChildRoutes(e, null, r);
        }
      }
      function sD(t) {
        nh(t.value), t.children.forEach(sD);
      }
      class ah {
        constructor(e, n) {
          (this.routes = e), (this.module = n);
        }
      }
      function gr(t) {
        return "function" == typeof t;
      }
      function Gr(t) {
        return t instanceof zr;
      }
      const Mo = Symbol("INITIAL_VALUE");
      function Ro() {
        return hr((t) =>
          (function (...t) {
            let e, n;
            return (
              $o(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && Kh(t[0]) && (t = t[0]),
              Eu(t, n).lift(new jF(e))
            );
          })(
            t.map((e) =>
              e.pipe(
                Gf(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return $o(e)
                    ? (t.pop(), (n) => zf(t, n, e))
                    : (n) => zf(t, n);
                })(Mo)
              )
            )
          ).pipe(
            TC((e, n) => {
              let r = !1;
              return n.reduce(
                (s, i, o) =>
                  s !== Mo
                    ? s
                    : (i === Mo && (r = !0),
                      r || (!1 !== i && o !== n.length - 1 && !Gr(i)) ? s : i),
                e
              );
            }, Mo),
            ni((e) => e !== Mo),
            fe((e) => (Gr(e) ? e : !0 === e)),
            Gf(1)
          )
        );
      }
      let iD = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = Wo({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (n, r) {
              1 & n && O(0, "router-outlet");
            },
            directives: function () {
              return [ph];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      function oD(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          uk(r, ck(e, r));
        }
      }
      function uk(t, e) {
        t.children && oD(t.children, e);
      }
      function ck(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? `${t}/`
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function lh(t) {
        const e = t.children && t.children.map(lh),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            n.outlet !== Q &&
            (n.component = iD),
          n
        );
      }
      function Vt(t) {
        return t.outlet || Q;
      }
      function aD(t, e) {
        const n = t.filter((r) => Vt(r) === e);
        return n.push(...t.filter((r) => Vt(r) !== e)), n;
      }
      const lD = {
        matched: !1,
        consumedSegments: [],
        lastChild: 0,
        parameters: {},
        positionalParamSegments: {},
      };
      function $l(t, e, n) {
        var r;
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? Object.assign({}, lD)
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                parameters: {},
                positionalParamSegments: {},
              };
        const i = (e.matcher || S2)(n, t, e);
        if (!i) return Object.assign({}, lD);
        const o = {};
        Ue(i.posParams, (l, u) => {
          o[u] = l.path;
        });
        const a =
          i.consumed.length > 0
            ? Object.assign(
                Object.assign({}, o),
                i.consumed[i.consumed.length - 1].parameters
              )
            : o;
        return {
          matched: !0,
          consumedSegments: i.consumed,
          lastChild: i.consumed.length,
          parameters: a,
          positionalParamSegments:
            null !== (r = i.posParams) && void 0 !== r ? r : {},
        };
      }
      function Ul(t, e, n, r, s = "corrected") {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((r) => Hl(t, e, r) && Vt(r) !== Q);
          })(t, n, r)
        ) {
          const o = new Z(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s[Q] = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const i of n)
                if ("" === i.path && Vt(i) !== Q) {
                  const o = new Z([], {});
                  (o._sourceSegment = t),
                    (o._segmentIndexShift = e.length),
                    (s[Vt(i)] = o);
                }
              return s;
            })(t, e, r, new Z(n, t.children))
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((r) => Hl(t, e, r));
          })(t, n, r)
        ) {
          const o = new Z(
            t.segments,
            (function (t, e, n, r, s, i) {
              const o = {};
              for (const a of r)
                if (Hl(t, n, a) && !s[Vt(a)]) {
                  const l = new Z([], {});
                  (l._sourceSegment = t),
                    (l._segmentIndexShift =
                      "legacy" === i ? t.segments.length : e.length),
                    (o[Vt(a)] = l);
                }
              return Object.assign(Object.assign({}, s), o);
            })(t, e, n, r, t.children, s)
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const i = new Z(t.segments, t.children);
        return (
          (i._sourceSegment = t),
          (i._segmentIndexShift = e.length),
          { segmentGroup: i, slicedSegments: n }
        );
      }
      function Hl(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      function uD(t, e, n, r) {
        return (
          !!(Vt(t) === r || (r !== Q && Hl(e, n, t))) &&
          ("**" === t.path || $l(e, t, n).matched)
        );
      }
      function cD(t, e, n) {
        return 0 === e.length && !t.children[n];
      }
      class Po {
        constructor(e) {
          this.segmentGroup = e || null;
        }
      }
      class dD {
        constructor(e) {
          this.urlTree = e;
        }
      }
      function ql(t) {
        return new ye((e) => e.error(new Po(t)));
      }
      function fD(t) {
        return new ye((e) => e.error(new dD(t)));
      }
      function gk(t) {
        return new ye((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class _k {
        constructor(e, n, r, s, i) {
          (this.configLoader = n),
            (this.urlSerializer = r),
            (this.urlTree = s),
            (this.config = i),
            (this.allowRedirects = !0),
            (this.ngModule = e.get(Dn));
        }
        apply() {
          const e = Ul(this.urlTree.root, [], [], this.config).segmentGroup,
            n = new Z(e.segments, e.children);
          return this.expandSegmentGroup(this.ngModule, this.config, n, Q)
            .pipe(
              fe((i) =>
                this.createUrlTree(
                  uh(i),
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              qr((i) => {
                if (i instanceof dD)
                  return (this.allowRedirects = !1), this.match(i.urlTree);
                throw i instanceof Po ? this.noMatchError(i) : i;
              })
            );
        }
        match(e) {
          return this.expandSegmentGroup(this.ngModule, this.config, e.root, Q)
            .pipe(
              fe((s) => this.createUrlTree(uh(s), e.queryParams, e.fragment))
            )
            .pipe(
              qr((s) => {
                throw s instanceof Po ? this.noMatchError(s) : s;
              })
            );
        }
        noMatchError(e) {
          return new Error(
            `Cannot match any routes. URL Segment: '${e.segmentGroup}'`
          );
        }
        createUrlTree(e, n, r) {
          const s = e.segments.length > 0 ? new Z([], { [Q]: e }) : e;
          return new zr(s, n, r);
        }
        expandSegmentGroup(e, n, r, s) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.expandChildren(e, n, r).pipe(fe((i) => new Z([], i)))
            : this.expandSegment(e, r, n, r.segments, s, !0);
        }
        expandChildren(e, n, r) {
          const s = [];
          for (const i of Object.keys(r.children))
            "primary" === i ? s.unshift(i) : s.push(i);
          return Je(s).pipe(
            bo((i) => {
              const o = r.children[i],
                a = aD(n, i);
              return this.expandSegmentGroup(e, a, o, i).pipe(
                fe((l) => ({ segment: l, outlet: i }))
              );
            }),
            TC((i, o) => ((i[o.outlet] = o.segment), i), {}),
            (function (t, e) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  t ? ni((s, i) => t(s, i, r)) : Bo,
                  Qf(1),
                  n ? AC(e) : IC(() => new Pl())
                );
            })()
          );
        }
        expandSegment(e, n, r, s, i, o) {
          return Je(r).pipe(
            bo((a) =>
              this.expandSegmentAgainstRoute(e, n, r, a, s, i, o).pipe(
                qr((u) => {
                  if (u instanceof Po) return q(null);
                  throw u;
                })
              )
            ),
            ri((a) => !!a),
            qr((a, l) => {
              if (a instanceof Pl || "EmptyError" === a.name) {
                if (cD(n, s, i)) return q(new Z([], {}));
                throw new Po(n);
              }
              throw a;
            })
          );
        }
        expandSegmentAgainstRoute(e, n, r, s, i, o, a) {
          return uD(s, n, i, o)
            ? void 0 === s.redirectTo
              ? this.matchSegmentAgainstRoute(e, n, s, i, o)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(e, n, r, s, i, o)
              : ql(n)
            : ql(n);
        }
        expandSegmentAgainstRouteUsingRedirect(e, n, r, s, i, o) {
          return "**" === s.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(e, r, s, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                e,
                n,
                r,
                s,
                i,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(e, n, r, s) {
          const i = this.applyRedirectCommands([], r.redirectTo, {});
          return r.redirectTo.startsWith("/")
            ? fD(i)
            : this.lineralizeSegments(r, i).pipe(
                $e((o) => {
                  const a = new Z(o, {});
                  return this.expandSegment(e, a, n, o, s, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(e, n, r, s, i, o) {
          const {
            matched: a,
            consumedSegments: l,
            lastChild: u,
            positionalParamSegments: c,
          } = $l(n, s, i);
          if (!a) return ql(n);
          const d = this.applyRedirectCommands(l, s.redirectTo, c);
          return s.redirectTo.startsWith("/")
            ? fD(d)
            : this.lineralizeSegments(s, d).pipe(
                $e((f) =>
                  this.expandSegment(e, n, r, f.concat(i.slice(u)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(e, n, r, s, i) {
          if ("**" === r.path)
            return r.loadChildren
              ? (r._loadedConfig
                  ? q(r._loadedConfig)
                  : this.configLoader.load(e.injector, r)
                ).pipe(fe((f) => ((r._loadedConfig = f), new Z(s, {}))))
              : q(new Z(s, {}));
          const { matched: o, consumedSegments: a, lastChild: l } = $l(n, r, s);
          if (!o) return ql(n);
          const u = s.slice(l);
          return this.getChildConfig(e, r, s).pipe(
            $e((d) => {
              const f = d.module,
                h = d.routes,
                { segmentGroup: p, slicedSegments: m } = Ul(n, a, u, h),
                g = new Z(p.segments, p.children);
              if (0 === m.length && g.hasChildren())
                return this.expandChildren(f, h, g).pipe(
                  fe((w) => new Z(a, w))
                );
              if (0 === h.length && 0 === m.length) return q(new Z(a, {}));
              const _ = Vt(r) === i;
              return this.expandSegment(f, g, h, m, _ ? Q : i, !0).pipe(
                fe((v) => new Z(a.concat(v.segments), v.children))
              );
            })
          );
        }
        getChildConfig(e, n, r) {
          return n.children
            ? q(new ah(n.children, e))
            : n.loadChildren
            ? void 0 !== n._loadedConfig
              ? q(n._loadedConfig)
              : this.runCanLoadGuards(e.injector, n, r).pipe(
                  $e((s) =>
                    s
                      ? this.configLoader
                          .load(e.injector, n)
                          .pipe(fe((i) => ((n._loadedConfig = i), i)))
                      : (function (t) {
                          return new ye((e) =>
                            e.error(
                              Zf(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(n)
                  )
                )
            : q(new ah([], e));
        }
        runCanLoadGuards(e, n, r) {
          const s = n.canLoad;
          if (!s || 0 === s.length) return q(!0);
          const i = s.map((o) => {
            const a = e.get(o);
            let l;
            if (
              (function (t) {
                return t && gr(t.canLoad);
              })(a)
            )
              l = a.canLoad(n, r);
            else {
              if (!gr(a)) throw new Error("Invalid CanLoad guard");
              l = a(n, r);
            }
            return bn(l);
          });
          return q(i).pipe(
            Ro(),
            vt((o) => {
              if (!Gr(o)) return;
              const a = Zf(
                `Redirecting to "${this.urlSerializer.serialize(o)}"`
              );
              throw ((a.url = o), a);
            }),
            fe((o) => !0 === o)
          );
        }
        lineralizeSegments(e, n) {
          let r = [],
            s = n.root;
          for (;;) {
            if (((r = r.concat(s.segments)), 0 === s.numberOfChildren))
              return q(r);
            if (s.numberOfChildren > 1 || !s.children[Q])
              return gk(e.redirectTo);
            s = s.children[Q];
          }
        }
        applyRedirectCommands(e, n, r) {
          return this.applyRedirectCreatreUrlTree(
            n,
            this.urlSerializer.parse(n),
            e,
            r
          );
        }
        applyRedirectCreatreUrlTree(e, n, r, s) {
          const i = this.createSegmentGroup(e, n.root, r, s);
          return new zr(
            i,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(e, n) {
          const r = {};
          return (
            Ue(e, (s, i) => {
              if ("string" == typeof s && s.startsWith(":")) {
                const a = s.substring(1);
                r[i] = n[a];
              } else r[i] = s;
            }),
            r
          );
        }
        createSegmentGroup(e, n, r, s) {
          const i = this.createSegments(e, n.segments, r, s);
          let o = {};
          return (
            Ue(n.children, (a, l) => {
              o[l] = this.createSegmentGroup(e, a, r, s);
            }),
            new Z(i, o)
          );
        }
        createSegments(e, n, r, s) {
          return n.map((i) =>
            i.path.startsWith(":")
              ? this.findPosParam(e, i, s)
              : this.findOrReturn(i, r)
          );
        }
        findPosParam(e, n, r) {
          const s = r[n.path.substring(1)];
          if (!s)
            throw new Error(
              `Cannot redirect to '${e}'. Cannot find '${n.path}'.`
            );
          return s;
        }
        findOrReturn(e, n) {
          let r = 0;
          for (const s of n) {
            if (s.path === e.path) return n.splice(r), s;
            r++;
          }
          return e;
        }
      }
      function uh(t) {
        const e = {};
        for (const r of Object.keys(t.children)) {
          const i = uh(t.children[r]);
          (i.segments.length > 0 || i.hasChildren()) && (e[r] = i);
        }
        return (function (t) {
          if (1 === t.numberOfChildren && t.children[Q]) {
            const e = t.children[Q];
            return new Z(t.segments.concat(e.segments), e.children);
          }
          return t;
        })(new Z(t.segments, e));
      }
      class hD {
        constructor(e) {
          (this.path = e), (this.route = this.path[this.path.length - 1]);
        }
      }
      class zl {
        constructor(e, n) {
          (this.component = e), (this.route = n);
        }
      }
      function Dk(t, e, n) {
        const r = t._root;
        return xo(r, e ? e._root : null, n, [r.value]);
      }
      function Wl(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const n = e.routeConfig;
            if (n && n._loadedConfig) return n._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function xo(
        t,
        e,
        n,
        r,
        s = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const i = Io(e);
        return (
          t.children.forEach((o) => {
            (function (
              t,
              e,
              n,
              r,
              s = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const i = t.value,
                o = e ? e.value : null,
                a = n ? n.getContext(t.value.outlet) : null;
              if (o && i.routeConfig === o.routeConfig) {
                const l = (function (t, e, n) {
                  if ("function" == typeof n) return n(t, e);
                  switch (n) {
                    case "pathParamsChange":
                      return !Wr(t.url, e.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Wr(t.url, e.url) || !vn(t.queryParams, e.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !rh(t, e) || !vn(t.queryParams, e.queryParams);
                    default:
                      return !rh(t, e);
                  }
                })(o, i, i.routeConfig.runGuardsAndResolvers);
                l
                  ? s.canActivateChecks.push(new hD(r))
                  : ((i.data = o.data), (i._resolvedData = o._resolvedData)),
                  xo(t, e, i.component ? (a ? a.children : null) : n, r, s),
                  l &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    s.canDeactivateChecks.push(new zl(a.outlet.component, o));
              } else
                o && No(e, a, s),
                  s.canActivateChecks.push(new hD(r)),
                  xo(t, null, i.component ? (a ? a.children : null) : n, r, s);
            })(o, i[o.value.outlet], n, r.concat([o.value]), s),
              delete i[o.value.outlet];
          }),
          Ue(i, (o, a) => No(o, n.getContext(a), s)),
          s
        );
      }
      function No(t, e, n) {
        const r = Io(t),
          s = t.value;
        Ue(r, (i, o) => {
          No(i, s.component ? (e ? e.children.getContext(o) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new zl(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      class Ok {}
      function pD(t) {
        return new ye((e) => e.error(t));
      }
      class kk {
        constructor(e, n, r, s, i, o) {
          (this.rootComponentType = e),
            (this.config = n),
            (this.urlTree = r),
            (this.url = s),
            (this.paramsInheritanceStrategy = i),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          const e = Ul(
              this.urlTree.root,
              [],
              [],
              this.config.filter((o) => void 0 === o.redirectTo),
              this.relativeLinkResolution
            ).segmentGroup,
            n = this.processSegmentGroup(this.config, e, Q);
          if (null === n) return null;
          const r = new Ll(
              [],
              Object.freeze({}),
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              Q,
              this.rootComponentType,
              null,
              this.urlTree.root,
              -1,
              {}
            ),
            s = new Hn(r, n),
            i = new ZC(this.url, s);
          return this.inheritParamsAndData(i._root), i;
        }
        inheritParamsAndData(e) {
          const n = e.value,
            r = KC(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            e.children.forEach((s) => this.inheritParamsAndData(s));
        }
        processSegmentGroup(e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.processChildren(e, n)
            : this.processSegment(e, n, n.segments, r);
        }
        processChildren(e, n) {
          const r = [];
          for (const i of Object.keys(n.children)) {
            const o = n.children[i],
              a = aD(e, i),
              l = this.processSegmentGroup(a, o, i);
            if (null === l) return null;
            r.push(...l);
          }
          const s = gD(r);
          return (
            (function (t) {
              t.sort((e, n) =>
                e.value.outlet === Q
                  ? -1
                  : n.value.outlet === Q
                  ? 1
                  : e.value.outlet.localeCompare(n.value.outlet)
              );
            })(s),
            s
          );
        }
        processSegment(e, n, r, s) {
          for (const i of e) {
            const o = this.processSegmentAgainstRoute(i, n, r, s);
            if (null !== o) return o;
          }
          return cD(n, r, s) ? [] : null;
        }
        processSegmentAgainstRoute(e, n, r, s) {
          if (e.redirectTo || !uD(e, n, r, s)) return null;
          let i,
            o = [],
            a = [];
          if ("**" === e.path) {
            const h = r.length > 0 ? kC(r).parameters : {};
            i = new Ll(
              r,
              h,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              _D(e),
              Vt(e),
              e.component,
              e,
              mD(n),
              yD(n) + r.length,
              ED(e)
            );
          } else {
            const h = $l(n, e, r);
            if (!h.matched) return null;
            (o = h.consumedSegments),
              (a = r.slice(h.lastChild)),
              (i = new Ll(
                o,
                h.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                _D(e),
                Vt(e),
                e.component,
                e,
                mD(n),
                yD(n) + o.length,
                ED(e)
              ));
          }
          const l = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(e),
            { segmentGroup: u, slicedSegments: c } = Ul(
              n,
              o,
              a,
              l.filter((h) => void 0 === h.redirectTo),
              this.relativeLinkResolution
            );
          if (0 === c.length && u.hasChildren()) {
            const h = this.processChildren(l, u);
            return null === h ? null : [new Hn(i, h)];
          }
          if (0 === l.length && 0 === c.length) return [new Hn(i, [])];
          const d = Vt(e) === s,
            f = this.processSegment(l, u, c, d ? Q : s);
          return null === f ? null : [new Hn(i, f)];
        }
      }
      function jk(t) {
        const e = t.value.routeConfig;
        return e && "" === e.path && void 0 === e.redirectTo;
      }
      function gD(t) {
        const e = [],
          n = new Set();
        for (const r of t) {
          if (!jk(r)) {
            e.push(r);
            continue;
          }
          const s = e.find((i) => r.value.routeConfig === i.value.routeConfig);
          void 0 !== s ? (s.children.push(...r.children), n.add(s)) : e.push(r);
        }
        for (const r of n) {
          const s = gD(r.children);
          e.push(new Hn(r.value, s));
        }
        return e.filter((r) => !n.has(r));
      }
      function mD(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function yD(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function _D(t) {
        return t.data || {};
      }
      function ED(t) {
        return t.resolve || {};
      }
      function ch(t) {
        return hr((e) => {
          const n = t(e);
          return n ? Je(n).pipe(fe(() => e)) : q(e);
        });
      }
      class Gk extends class {
        shouldDetach(e) {
          return !1;
        }
        store(e, n) {}
        shouldAttach(e) {
          return !1;
        }
        retrieve(e) {
          return null;
        }
        shouldReuseRoute(e, n) {
          return e.routeConfig === n.routeConfig;
        }
      } {}
      const dh = new J("ROUTES");
      class CD {
        constructor(e, n, r, s) {
          (this.loader = e),
            (this.compiler = n),
            (this.onLoadStartListener = r),
            (this.onLoadEndListener = s);
        }
        load(e, n) {
          if (n._loader$) return n._loader$;
          this.onLoadStartListener && this.onLoadStartListener(n);
          const s = this.loadModuleFactory(n.loadChildren).pipe(
            fe((i) => {
              this.onLoadEndListener && this.onLoadEndListener(n);
              const o = i.create(e);
              return new ah(
                FC(o.injector.get(dh, void 0, P.Self | P.Optional)).map(lh),
                o
              );
            }),
            qr((i) => {
              throw ((n._loader$ = void 0), i);
            })
          );
          return (
            (n._loader$ = new op(s, () => new An()).pipe(Cu())), n._loader$
          );
        }
        loadModuleFactory(e) {
          return "string" == typeof e
            ? Je(this.loader.load(e))
            : bn(e()).pipe(
                $e((n) =>
                  n instanceof e0
                    ? q(n)
                    : Je(this.compiler.compileModuleAsync(n))
                )
              );
        }
      }
      class Qk {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new oi()),
            (this.attachRef = null);
        }
      }
      class oi {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(e, n) {
          const r = this.getOrCreateContext(e);
          (r.outlet = n), this.contexts.set(e, r);
        }
        onChildOutletDestroyed(e) {
          const n = this.getContext(e);
          n && ((n.outlet = null), (n.attachRef = null));
        }
        onOutletDeactivated() {
          const e = this.contexts;
          return (this.contexts = new Map()), e;
        }
        onOutletReAttached(e) {
          this.contexts = e;
        }
        getOrCreateContext(e) {
          let n = this.getContext(e);
          return n || ((n = new Qk()), this.contexts.set(e, n)), n;
        }
        getContext(e) {
          return this.contexts.get(e) || null;
        }
      }
      class Zk {
        shouldProcessUrl(e) {
          return !0;
        }
        extract(e) {
          return e;
        }
        merge(e, n) {
          return e;
        }
      }
      function Yk(t) {
        throw t;
      }
      function Jk(t, e, n) {
        return e.parse("/");
      }
      function DD(t, e) {
        return q(null);
      }
      const Xk = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        eL = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let dt = (() => {
        class t {
          constructor(n, r, s, i, o, a, l, u) {
            (this.rootComponentType = n),
              (this.urlSerializer = r),
              (this.rootContexts = s),
              (this.location = i),
              (this.config = u),
              (this.lastSuccessfulNavigation = null),
              (this.currentNavigation = null),
              (this.disposed = !1),
              (this.lastLocationChangeInfo = null),
              (this.navigationId = 0),
              (this.currentPageId = 0),
              (this.isNgZoneEnabled = !1),
              (this.events = new An()),
              (this.errorHandler = Yk),
              (this.malformedUriErrorHandler = Jk),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.hooks = {
                beforePreactivation: DD,
                afterPreactivation: DD,
              }),
              (this.urlHandlingStrategy = new Zk()),
              (this.routeReuseStrategy = new Gk()),
              (this.onSameUrlNavigation = "ignore"),
              (this.paramsInheritanceStrategy = "emptyOnly"),
              (this.urlUpdateStrategy = "deferred"),
              (this.relativeLinkResolution = "corrected"),
              (this.canceledNavigationResolution = "replace"),
              (this.ngModule = o.get(Dn)),
              (this.console = o.get(tl));
            const f = o.get(Se);
            (this.isNgZoneEnabled = f instanceof Se && Se.isInAngularZone()),
              this.resetConfig(u),
              (this.currentUrlTree = new zr(new Z([], {}), {}, null)),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.configLoader = new CD(
                a,
                l,
                (h) => this.triggerEvent(new RC(h)),
                (h) => this.triggerEvent(new PC(h))
              )),
              (this.routerState = QC(
                this.currentUrlTree,
                this.rootComponentType
              )),
              (this.transitions = new an({
                id: 0,
                targetPageId: 0,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                extractedUrl: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                urlAfterRedirects: this.urlHandlingStrategy.extract(
                  this.currentUrlTree
                ),
                rawUrl: this.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: "imperative",
                restoredState: null,
                currentSnapshot: this.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: this.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              (this.navigations = this.setupNavigations(this.transitions)),
              this.processNavigations();
          }
          get browserPageId() {
            var n;
            return null === (n = this.location.getState()) || void 0 === n
              ? void 0
              : n.ɵrouterPageId;
          }
          setupNavigations(n) {
            const r = this.events;
            return n.pipe(
              ni((s) => 0 !== s.id),
              fe((s) =>
                Object.assign(Object.assign({}, s), {
                  extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
                })
              ),
              hr((s) => {
                let i = !1,
                  o = !1;
                return q(s).pipe(
                  vt((a) => {
                    this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.currentRawUrl,
                      extractedUrl: a.extractedUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? Object.assign(
                            Object.assign({}, this.lastSuccessfulNavigation),
                            { previousNavigation: null }
                          )
                        : null,
                    };
                  }),
                  hr((a) => {
                    const l = this.browserUrlTree.toString(),
                      u =
                        !this.navigated ||
                        a.extractedUrl.toString() !== l ||
                        l !== this.currentUrlTree.toString();
                    if (
                      ("reload" === this.onSameUrlNavigation || u) &&
                      this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl)
                    )
                      return (
                        Gl(a.source) && (this.browserUrlTree = a.extractedUrl),
                        q(a).pipe(
                          hr((d) => {
                            const f = this.transitions.getValue();
                            return (
                              r.next(
                                new Kf(
                                  d.id,
                                  this.serializeUrl(d.extractedUrl),
                                  d.source,
                                  d.restoredState
                                )
                              ),
                              f !== this.transitions.getValue()
                                ? ti
                                : Promise.resolve(d)
                            );
                          }),
                          (function (t, e, n, r) {
                            return hr((s) =>
                              (function (t, e, n, r, s) {
                                return new _k(t, e, n, r, s).apply();
                              })(t, e, n, s.extractedUrl, r).pipe(
                                fe((i) =>
                                  Object.assign(Object.assign({}, s), {
                                    urlAfterRedirects: i,
                                  })
                                )
                              )
                            );
                          })(
                            this.ngModule.injector,
                            this.configLoader,
                            this.urlSerializer,
                            this.config
                          ),
                          vt((d) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: d.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return $e((i) =>
                              (function (
                                t,
                                e,
                                n,
                                r,
                                s = "emptyOnly",
                                i = "legacy"
                              ) {
                                try {
                                  const o = new kk(
                                    t,
                                    e,
                                    n,
                                    r,
                                    s,
                                    i
                                  ).recognize();
                                  return null === o ? pD(new Ok()) : q(o);
                                } catch (o) {
                                  return pD(o);
                                }
                              })(
                                t,
                                e,
                                i.urlAfterRedirects,
                                n(i.urlAfterRedirects),
                                r,
                                s
                              ).pipe(
                                fe((o) =>
                                  Object.assign(Object.assign({}, i), {
                                    targetSnapshot: o,
                                  })
                                )
                              )
                            );
                          })(
                            this.rootComponentType,
                            this.config,
                            (d) => this.serializeUrl(d),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          vt((d) => {
                            "eager" === this.urlUpdateStrategy &&
                              (d.extras.skipLocationChange ||
                                this.setBrowserUrl(d.urlAfterRedirects, d),
                              (this.browserUrlTree = d.urlAfterRedirects));
                            const f = new p2(
                              d.id,
                              this.serializeUrl(d.extractedUrl),
                              this.serializeUrl(d.urlAfterRedirects),
                              d.targetSnapshot
                            );
                            r.next(f);
                          })
                        )
                      );
                    if (
                      u &&
                      this.rawUrlTree &&
                      this.urlHandlingStrategy.shouldProcessUrl(this.rawUrlTree)
                    ) {
                      const {
                          id: f,
                          extractedUrl: h,
                          source: p,
                          restoredState: m,
                          extras: g,
                        } = a,
                        _ = new Kf(f, this.serializeUrl(h), p, m);
                      r.next(_);
                      const y = QC(h, this.rootComponentType).snapshot;
                      return q(
                        Object.assign(Object.assign({}, a), {
                          targetSnapshot: y,
                          urlAfterRedirects: h,
                          extras: Object.assign(Object.assign({}, g), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })
                      );
                    }
                    return (
                      (this.rawUrlTree = a.rawUrl),
                      (this.browserUrlTree = a.urlAfterRedirects),
                      a.resolve(null),
                      ti
                    );
                  }),
                  ch((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.beforePreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  vt((a) => {
                    const l = new g2(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot
                    );
                    this.triggerEvent(l);
                  }),
                  fe((a) =>
                    Object.assign(Object.assign({}, a), {
                      guards: Dk(
                        a.targetSnapshot,
                        a.currentSnapshot,
                        this.rootContexts
                      ),
                    })
                  ),
                  (function (t, e) {
                    return $e((n) => {
                      const {
                        targetSnapshot: r,
                        currentSnapshot: s,
                        guards: {
                          canActivateChecks: i,
                          canDeactivateChecks: o,
                        },
                      } = n;
                      return 0 === o.length && 0 === i.length
                        ? q(
                            Object.assign(Object.assign({}, n), {
                              guardsResult: !0,
                            })
                          )
                        : (function (t, e, n, r) {
                            return Je(t).pipe(
                              $e((s) =>
                                (function (t, e, n, r, s) {
                                  const i =
                                    e && e.routeConfig
                                      ? e.routeConfig.canDeactivate
                                      : null;
                                  return i && 0 !== i.length
                                    ? q(
                                        i.map((a) => {
                                          const l = Wl(a, e, s);
                                          let u;
                                          if (
                                            (function (t) {
                                              return t && gr(t.canDeactivate);
                                            })(l)
                                          )
                                            u = bn(l.canDeactivate(t, e, n, r));
                                          else {
                                            if (!gr(l))
                                              throw new Error(
                                                "Invalid CanDeactivate guard"
                                              );
                                            u = bn(l(t, e, n, r));
                                          }
                                          return u.pipe(ri());
                                        })
                                      ).pipe(Ro())
                                    : q(!0);
                                })(s.component, s.route, n, e, r)
                              ),
                              ri((s) => !0 !== s, !0)
                            );
                          })(o, r, s, t).pipe(
                            $e((a) =>
                              a &&
                              (function (t) {
                                return "boolean" == typeof t;
                              })(a)
                                ? (function (t, e, n, r) {
                                    return Je(e).pipe(
                                      bo((s) =>
                                        zf(
                                          (function (t, e) {
                                            return (
                                              null !== t && e && e(new E2(t)),
                                              q(!0)
                                            );
                                          })(s.route.parent, r),
                                          (function (t, e) {
                                            return (
                                              null !== t && e && e(new D2(t)),
                                              q(!0)
                                            );
                                          })(s.route, r),
                                          (function (t, e, n) {
                                            const r = e[e.length - 1],
                                              i = e
                                                .slice(0, e.length - 1)
                                                .reverse()
                                                .map((o) =>
                                                  (function (t) {
                                                    const e = t.routeConfig
                                                      ? t.routeConfig
                                                          .canActivateChild
                                                      : null;
                                                    return e && 0 !== e.length
                                                      ? { node: t, guards: e }
                                                      : null;
                                                  })(o)
                                                )
                                                .filter((o) => null !== o)
                                                .map((o) =>
                                                  wC(() =>
                                                    q(
                                                      o.guards.map((l) => {
                                                        const u = Wl(
                                                          l,
                                                          o.node,
                                                          n
                                                        );
                                                        let c;
                                                        if (
                                                          (function (t) {
                                                            return (
                                                              t &&
                                                              gr(
                                                                t.canActivateChild
                                                              )
                                                            );
                                                          })(u)
                                                        )
                                                          c = bn(
                                                            u.canActivateChild(
                                                              r,
                                                              t
                                                            )
                                                          );
                                                        else {
                                                          if (!gr(u))
                                                            throw new Error(
                                                              "Invalid CanActivateChild guard"
                                                            );
                                                          c = bn(u(r, t));
                                                        }
                                                        return c.pipe(ri());
                                                      })
                                                    ).pipe(Ro())
                                                  )
                                                );
                                            return q(i).pipe(Ro());
                                          })(t, s.path, n),
                                          (function (t, e, n) {
                                            const r = e.routeConfig
                                              ? e.routeConfig.canActivate
                                              : null;
                                            if (!r || 0 === r.length)
                                              return q(!0);
                                            const s = r.map((i) =>
                                              wC(() => {
                                                const o = Wl(i, e, n);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && gr(t.canActivate)
                                                    );
                                                  })(o)
                                                )
                                                  a = bn(o.canActivate(e, t));
                                                else {
                                                  if (!gr(o))
                                                    throw new Error(
                                                      "Invalid CanActivate guard"
                                                    );
                                                  a = bn(o(e, t));
                                                }
                                                return a.pipe(ri());
                                              })
                                            );
                                            return q(s).pipe(Ro());
                                          })(t, s.route, n)
                                        )
                                      ),
                                      ri((s) => !0 !== s, !0)
                                    );
                                  })(r, i, t, e)
                                : q(a)
                            ),
                            fe((a) =>
                              Object.assign(Object.assign({}, n), {
                                guardsResult: a,
                              })
                            )
                          );
                    });
                  })(this.ngModule.injector, (a) => this.triggerEvent(a)),
                  vt((a) => {
                    if (Gr(a.guardsResult)) {
                      const u = Zf(
                        `Redirecting to "${this.serializeUrl(a.guardsResult)}"`
                      );
                      throw ((u.url = a.guardsResult), u);
                    }
                    const l = new m2(
                      a.id,
                      this.serializeUrl(a.extractedUrl),
                      this.serializeUrl(a.urlAfterRedirects),
                      a.targetSnapshot,
                      !!a.guardsResult
                    );
                    this.triggerEvent(l);
                  }),
                  ni(
                    (a) =>
                      !!a.guardsResult ||
                      (this.restoreHistory(a),
                      this.cancelNavigationTransition(a, ""),
                      !1)
                  ),
                  ch((a) => {
                    if (a.guards.canActivateChecks.length)
                      return q(a).pipe(
                        vt((l) => {
                          const u = new y2(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        }),
                        hr((l) => {
                          let u = !1;
                          return q(l).pipe(
                            (function (t, e) {
                              return $e((n) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: s },
                                } = n;
                                if (!s.length) return q(n);
                                let i = 0;
                                return Je(s).pipe(
                                  bo((o) =>
                                    (function (t, e, n, r) {
                                      return (function (t, e, n, r) {
                                        const s = Object.keys(t);
                                        if (0 === s.length) return q({});
                                        const i = {};
                                        return Je(s).pipe(
                                          $e((o) =>
                                            (function (t, e, n, r) {
                                              const s = Wl(t, e, r);
                                              return bn(
                                                s.resolve
                                                  ? s.resolve(e, n)
                                                  : s(e, n)
                                              );
                                            })(t[o], e, n, r).pipe(
                                              vt((a) => {
                                                i[o] = a;
                                              })
                                            )
                                          ),
                                          Qf(1),
                                          $e(() =>
                                            Object.keys(i).length === s.length
                                              ? q(i)
                                              : ti
                                          )
                                        );
                                      })(t._resolve, t, e, r).pipe(
                                        fe(
                                          (i) => (
                                            (t._resolvedData = i),
                                            (t.data = Object.assign(
                                              Object.assign({}, t.data),
                                              KC(t, n).resolve
                                            )),
                                            null
                                          )
                                        )
                                      );
                                    })(o.route, r, t, e)
                                  ),
                                  vt(() => i++),
                                  Qf(1),
                                  $e((o) => (i === s.length ? q(n) : ti))
                                );
                              });
                            })(
                              this.paramsInheritanceStrategy,
                              this.ngModule.injector
                            ),
                            vt({
                              next: () => (u = !0),
                              complete: () => {
                                u ||
                                  (this.restoreHistory(l),
                                  this.cancelNavigationTransition(
                                    l,
                                    "At least one route resolver didn't emit any value."
                                  ));
                              },
                            })
                          );
                        }),
                        vt((l) => {
                          const u = new _2(
                            l.id,
                            this.serializeUrl(l.extractedUrl),
                            this.serializeUrl(l.urlAfterRedirects),
                            l.targetSnapshot
                          );
                          this.triggerEvent(u);
                        })
                      );
                  }),
                  ch((a) => {
                    const {
                      targetSnapshot: l,
                      id: u,
                      extractedUrl: c,
                      rawUrl: d,
                      extras: { skipLocationChange: f, replaceUrl: h },
                    } = a;
                    return this.hooks.afterPreactivation(l, {
                      navigationId: u,
                      appliedUrlTree: c,
                      rawUrlTree: d,
                      skipLocationChange: !!f,
                      replaceUrl: !!h,
                    });
                  }),
                  fe((a) => {
                    const l = (function (t, e, n) {
                      const r = Vl(t, e._root, n ? n._root : void 0);
                      return new GC(r, e);
                    })(
                      this.routeReuseStrategy,
                      a.targetSnapshot,
                      a.currentRouterState
                    );
                    return Object.assign(Object.assign({}, a), {
                      targetRouterState: l,
                    });
                  }),
                  vt((a) => {
                    (this.currentUrlTree = a.urlAfterRedirects),
                      (this.rawUrlTree = this.urlHandlingStrategy.merge(
                        a.urlAfterRedirects,
                        a.rawUrl
                      )),
                      (this.routerState = a.targetRouterState),
                      "deferred" === this.urlUpdateStrategy &&
                        (a.extras.skipLocationChange ||
                          this.setBrowserUrl(this.rawUrlTree, a),
                        (this.browserUrlTree = a.urlAfterRedirects));
                  }),
                  ((t, e, n) =>
                    fe(
                      (r) => (
                        new nk(
                          e,
                          r.targetRouterState,
                          r.currentRouterState,
                          n
                        ).activate(t),
                        r
                      )
                    ))(this.rootContexts, this.routeReuseStrategy, (a) =>
                    this.triggerEvent(a)
                  ),
                  vt({
                    next() {
                      i = !0;
                    },
                    complete() {
                      i = !0;
                    },
                  }),
                  (function (t) {
                    return (e) => e.lift(new d2(t));
                  })(() => {
                    var a;
                    if (!i && !o) {
                      const l = `Navigation ID ${s.id} is not equal to the current navigation id ${this.navigationId}`;
                      "replace" === this.canceledNavigationResolution
                        ? (this.restoreHistory(s),
                          this.cancelNavigationTransition(s, l))
                        : this.cancelNavigationTransition(s, l);
                    }
                    (null === (a = this.currentNavigation) || void 0 === a
                      ? void 0
                      : a.id) === s.id && (this.currentNavigation = null);
                  }),
                  qr((a) => {
                    if (
                      ((o = !0),
                      (function (t) {
                        return t && t[NC];
                      })(a))
                    ) {
                      const l = Gr(a.url);
                      l || ((this.navigated = !0), this.restoreHistory(s, !0));
                      const u = new MC(
                        s.id,
                        this.serializeUrl(s.extractedUrl),
                        a.message
                      );
                      r.next(u),
                        l
                          ? setTimeout(() => {
                              const c = this.urlHandlingStrategy.merge(
                                  a.url,
                                  this.rawUrlTree
                                ),
                                d = {
                                  skipLocationChange:
                                    s.extras.skipLocationChange,
                                  replaceUrl:
                                    "eager" === this.urlUpdateStrategy ||
                                    Gl(s.source),
                                };
                              this.scheduleNavigation(
                                c,
                                "imperative",
                                null,
                                d,
                                {
                                  resolve: s.resolve,
                                  reject: s.reject,
                                  promise: s.promise,
                                }
                              );
                            }, 0)
                          : s.resolve(!1);
                    } else {
                      this.restoreHistory(s, !0);
                      const l = new h2(
                        s.id,
                        this.serializeUrl(s.extractedUrl),
                        a
                      );
                      r.next(l);
                      try {
                        s.resolve(this.errorHandler(a));
                      } catch (u) {
                        s.reject(u);
                      }
                    }
                    return ti;
                  })
                );
              })
            );
          }
          resetRootComponentType(n) {
            (this.rootComponentType = n),
              (this.routerState.root.component = this.rootComponentType);
          }
          getTransition() {
            const n = this.transitions.value;
            return (n.urlAfterRedirects = this.browserUrlTree), n;
          }
          setTransition(n) {
            this.transitions.next(
              Object.assign(Object.assign({}, this.getTransition()), n)
            );
          }
          initialNavigation() {
            this.setUpLocationChangeListener(),
              0 === this.navigationId &&
                this.navigateByUrl(this.location.path(!0), { replaceUrl: !0 });
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((n) => {
                const r = this.extractLocationChangeInfoFromEvent(n);
                this.shouldScheduleNavigation(this.lastLocationChangeInfo, r) &&
                  setTimeout(() => {
                    const { source: s, state: i, urlTree: o } = r,
                      a = { replaceUrl: !0 };
                    if (i) {
                      const l = Object.assign({}, i);
                      delete l.navigationId,
                        delete l.ɵrouterPageId,
                        0 !== Object.keys(l).length && (a.state = l);
                    }
                    this.scheduleNavigation(o, s, i, a);
                  }, 0),
                  (this.lastLocationChangeInfo = r);
              }));
          }
          extractLocationChangeInfoFromEvent(n) {
            var r;
            return {
              source: "popstate" === n.type ? "popstate" : "hashchange",
              urlTree: this.parseUrl(n.url),
              state: (
                null === (r = n.state) || void 0 === r ? void 0 : r.navigationId
              )
                ? n.state
                : null,
              transitionId: this.getTransition().id,
            };
          }
          shouldScheduleNavigation(n, r) {
            if (!n) return !0;
            const s = r.urlTree.toString() === n.urlTree.toString();
            return (
              r.transitionId !== n.transitionId ||
              !s ||
              !(
                ("hashchange" === r.source && "popstate" === n.source) ||
                ("popstate" === r.source && "hashchange" === n.source)
              )
            );
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.currentNavigation;
          }
          triggerEvent(n) {
            this.events.next(n);
          }
          resetConfig(n) {
            oD(n),
              (this.config = n.map(lh)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.transitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(n, r = {}) {
            const {
                relativeTo: s,
                queryParams: i,
                fragment: o,
                queryParamsHandling: a,
                preserveFragment: l,
              } = r,
              u = s || this.routerState.root,
              c = l ? this.currentUrlTree.fragment : o;
            let d = null;
            switch (a) {
              case "merge":
                d = Object.assign(
                  Object.assign({}, this.currentUrlTree.queryParams),
                  i
                );
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            return (
              null !== d && (d = this.removeEmptyProps(d)),
              (function (t, e, n, r, s) {
                if (0 === n.length) return sh(e.root, e.root, e, r, s);
                const i = (function (t) {
                  if ("string" == typeof t[0] && 1 === t.length && "/" === t[0])
                    return new eD(!0, 0, t);
                  let e = 0,
                    n = !1;
                  const r = t.reduce((s, i, o) => {
                    if ("object" == typeof i && null != i) {
                      if (i.outlets) {
                        const a = {};
                        return (
                          Ue(i.outlets, (l, u) => {
                            a[u] = "string" == typeof l ? l.split("/") : l;
                          }),
                          [...s, { outlets: a }]
                        );
                      }
                      if (i.segmentPath) return [...s, i.segmentPath];
                    }
                    return "string" != typeof i
                      ? [...s, i]
                      : 0 === o
                      ? (i.split("/").forEach((a, l) => {
                          (0 == l && "." === a) ||
                            (0 == l && "" === a
                              ? (n = !0)
                              : ".." === a
                              ? e++
                              : "" != a && s.push(a));
                        }),
                        s)
                      : [...s, i];
                  }, []);
                  return new eD(n, e, r);
                })(n);
                if (i.toRoot()) return sh(e.root, new Z([], {}), e, r, s);
                const o = (function (t, e, n) {
                    if (t.isAbsolute) return new ih(e.root, !0, 0);
                    if (-1 === n.snapshot._lastPathIndex) {
                      const i = n.snapshot._urlSegment;
                      return new ih(i, i === e.root, 0);
                    }
                    const r = jl(t.commands[0]) ? 0 : 1;
                    return (function (t, e, n) {
                      let r = t,
                        s = e,
                        i = n;
                      for (; i > s; ) {
                        if (((i -= s), (r = r.parent), !r))
                          throw new Error("Invalid number of '../'");
                        s = r.segments.length;
                      }
                      return new ih(r, !1, s - i);
                    })(
                      n.snapshot._urlSegment,
                      n.snapshot._lastPathIndex + r,
                      t.numberOfDoubleDots
                    );
                  })(i, e, t),
                  a = o.processChildren
                    ? Bl(o.segmentGroup, o.index, i.commands)
                    : tD(o.segmentGroup, o.index, i.commands);
                return sh(o.segmentGroup, a, e, r, s);
              })(u, this.currentUrlTree, n, d, null != c ? c : null)
            );
          }
          navigateByUrl(n, r = { skipLocationChange: !1 }) {
            const s = Gr(n) ? n : this.parseUrl(n),
              i = this.urlHandlingStrategy.merge(s, this.rawUrlTree);
            return this.scheduleNavigation(i, "imperative", null, r);
          }
          navigate(n, r = { skipLocationChange: !1 }) {
            return (
              (function (t) {
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  if (null == n)
                    throw new Error(
                      `The requested path contains ${n} segment at index ${e}`
                    );
                }
              })(n),
              this.navigateByUrl(this.createUrlTree(n, r), r)
            );
          }
          serializeUrl(n) {
            return this.urlSerializer.serialize(n);
          }
          parseUrl(n) {
            let r;
            try {
              r = this.urlSerializer.parse(n);
            } catch (s) {
              r = this.malformedUriErrorHandler(s, this.urlSerializer, n);
            }
            return r;
          }
          isActive(n, r) {
            let s;
            if (
              ((s =
                !0 === r
                  ? Object.assign({}, Xk)
                  : !1 === r
                  ? Object.assign({}, eL)
                  : r),
              Gr(n))
            )
              return VC(this.currentUrlTree, n, s);
            const i = this.parseUrl(n);
            return VC(this.currentUrlTree, i, s);
          }
          removeEmptyProps(n) {
            return Object.keys(n).reduce((r, s) => {
              const i = n[s];
              return null != i && (r[s] = i), r;
            }, {});
          }
          processNavigations() {
            this.navigations.subscribe(
              (n) => {
                (this.navigated = !0),
                  (this.lastSuccessfulId = n.id),
                  (this.currentPageId = n.targetPageId),
                  this.events.next(
                    new wo(
                      n.id,
                      this.serializeUrl(n.extractedUrl),
                      this.serializeUrl(this.currentUrlTree)
                    )
                  ),
                  (this.lastSuccessfulNavigation = this.currentNavigation),
                  n.resolve(!0);
              },
              (n) => {
                this.console.warn(`Unhandled Navigation Error: ${n}`);
              }
            );
          }
          scheduleNavigation(n, r, s, i, o) {
            var a, l;
            if (this.disposed) return Promise.resolve(!1);
            const u = this.getTransition(),
              c = Gl(r) && u && !Gl(u.source),
              h =
                (this.lastSuccessfulId === u.id || this.currentNavigation
                  ? u.rawUrl
                  : u.urlAfterRedirects
                ).toString() === n.toString();
            if (c && h) return Promise.resolve(!0);
            let p, m, g;
            o
              ? ((p = o.resolve), (m = o.reject), (g = o.promise))
              : (g = new Promise((v, w) => {
                  (p = v), (m = w);
                }));
            const _ = ++this.navigationId;
            let y;
            return (
              "computed" === this.canceledNavigationResolution
                ? (0 === this.currentPageId && (s = this.location.getState()),
                  (y =
                    s && s.ɵrouterPageId
                      ? s.ɵrouterPageId
                      : i.replaceUrl || i.skipLocationChange
                      ? null !== (a = this.browserPageId) && void 0 !== a
                        ? a
                        : 0
                      : (null !== (l = this.browserPageId) && void 0 !== l
                          ? l
                          : 0) + 1))
                : (y = 0),
              this.setTransition({
                id: _,
                targetPageId: y,
                source: r,
                restoredState: s,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.rawUrlTree,
                rawUrl: n,
                extras: i,
                resolve: p,
                reject: m,
                promise: g,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              g.catch((v) => Promise.reject(v))
            );
          }
          setBrowserUrl(n, r) {
            const s = this.urlSerializer.serialize(n),
              i = Object.assign(
                Object.assign({}, r.extras.state),
                this.generateNgRouterState(r.id, r.targetPageId)
              );
            this.location.isCurrentPathEqualTo(s) || r.extras.replaceUrl
              ? this.location.replaceState(s, "", i)
              : this.location.go(s, "", i);
          }
          restoreHistory(n, r = !1) {
            var s, i;
            if ("computed" === this.canceledNavigationResolution) {
              const o = this.currentPageId - n.targetPageId;
              ("popstate" !== n.source &&
                "eager" !== this.urlUpdateStrategy &&
                this.currentUrlTree !==
                  (null === (s = this.currentNavigation) || void 0 === s
                    ? void 0
                    : s.finalUrl)) ||
              0 === o
                ? this.currentUrlTree ===
                    (null === (i = this.currentNavigation) || void 0 === i
                      ? void 0
                      : i.finalUrl) &&
                  0 === o &&
                  (this.resetState(n),
                  (this.browserUrlTree = n.currentUrlTree),
                  this.resetUrlToCurrentUrlTree())
                : this.location.historyGo(o);
            } else
              "replace" === this.canceledNavigationResolution &&
                (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
          }
          resetState(n) {
            (this.routerState = n.currentRouterState),
              (this.currentUrlTree = n.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                n.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          cancelNavigationTransition(n, r) {
            const s = new MC(n.id, this.serializeUrl(n.extractedUrl), r);
            this.triggerEvent(s), n.resolve(!1);
          }
          generateNgRouterState(n, r) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: n, ɵrouterPageId: r }
              : { navigationId: n };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              b(fa),
              b(Yf),
              b(oi),
              b(pl),
              b(oe),
              b(rl),
              b(Br),
              b(void 0)
            );
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Gl(t) {
        return "imperative" !== t;
      }
      let ph = (() => {
        class t {
          constructor(n, r, s, i, o) {
            (this.parentContexts = n),
              (this.location = r),
              (this.resolver = s),
              (this.changeDetector = o),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Ft()),
              (this.deactivateEvents = new Ft()),
              (this.name = i || Q),
              n.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const n = this.parentContexts.getContext(this.name);
              n &&
                n.route &&
                (n.attachRef
                  ? this.attach(n.attachRef, n.route)
                  : this.activateWith(n.route, n.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const n = this.activated;
            return (this.activated = null), (this._activatedRoute = null), n;
          }
          attach(n, r) {
            (this.activated = n),
              (this._activatedRoute = r),
              this.location.insert(n.hostView);
          }
          deactivate() {
            if (this.activated) {
              const n = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(n);
            }
          }
          activateWith(n, r) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = n;
            const o = (r = r || this.resolver).resolveComponentFactory(
                n._futureSnapshot.routeConfig.component
              ),
              a = this.parentContexts.getOrCreateContext(this.name).children,
              l = new sL(n, a, this.location.injector);
            (this.activated = this.location.createComponent(
              o,
              this.location.length,
              l
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              M(oi),
              M(Jt),
              M(kr),
              (function (t) {
                return (function (t, e) {
                  if ("class" === e) return t.classes;
                  if ("style" === e) return t.styles;
                  const n = t.attrs;
                  if (n) {
                    const r = n.length;
                    let s = 0;
                    for (; s < r; ) {
                      const i = n[s];
                      if (Vp(i)) break;
                      if (0 === i) s += 2;
                      else if ("number" == typeof i)
                        for (s++; s < r && "string" == typeof n[s]; ) s++;
                      else {
                        if (i === e) return n[s + 1];
                        s += 2;
                      }
                    }
                  }
                  return null;
                })(xe(), t);
              })("name"),
              M(Dd)
            );
          }),
          (t.ɵdir = He({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class sL {
        constructor(e, n, r) {
          (this.route = e), (this.childContexts = n), (this.parent = r);
        }
        get(e, n) {
          return e === ii
            ? this.route
            : e === oi
            ? this.childContexts
            : this.parent.get(e, n);
        }
      }
      class vD {}
      class bD {
        preload(e, n) {
          return q(null);
        }
      }
      let wD = (() => {
          class t {
            constructor(n, r, s, i, o) {
              (this.router = n),
                (this.injector = i),
                (this.preloadingStrategy = o),
                (this.loader = new CD(
                  r,
                  s,
                  (u) => n.triggerEvent(new RC(u)),
                  (u) => n.triggerEvent(new PC(u))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  ni((n) => n instanceof wo),
                  bo(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const n = this.injector.get(Dn);
              return this.processRoutes(n, this.router.config);
            }
            ngOnDestroy() {
              this.subscription && this.subscription.unsubscribe();
            }
            processRoutes(n, r) {
              const s = [];
              for (const i of r)
                if (i.loadChildren && !i.canLoad && i._loadedConfig) {
                  const o = i._loadedConfig;
                  s.push(this.processRoutes(o.module, o.routes));
                } else
                  i.loadChildren && !i.canLoad
                    ? s.push(this.preloadConfig(n, i))
                    : i.children && s.push(this.processRoutes(n, i.children));
              return Je(s).pipe(
                mi(),
                fe((i) => {})
              );
            }
            preloadConfig(n, r) {
              return this.preloadingStrategy.preload(r, () =>
                (r._loadedConfig
                  ? q(r._loadedConfig)
                  : this.loader.load(n.injector, r)
                ).pipe(
                  $e(
                    (i) => (
                      (r._loadedConfig = i),
                      this.processRoutes(i.module, i.routes)
                    )
                  )
                )
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(dt), b(rl), b(Br), b(oe), b(vD));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        gh = (() => {
          class t {
            constructor(n, r, s = {}) {
              (this.router = n),
                (this.viewportScroller = r),
                (this.options = s),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (s.scrollPositionRestoration =
                  s.scrollPositionRestoration || "disabled"),
                (s.anchorScrolling = s.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof Kf
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = n.navigationTrigger),
                    (this.restoredId = n.restoredState
                      ? n.restoredState.navigationId
                      : 0))
                  : n instanceof wo &&
                    ((this.lastId = n.id),
                    this.scheduleScrollEvent(
                      n,
                      this.router.parseUrl(n.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((n) => {
                n instanceof xC &&
                  (n.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(n.position)
                    : n.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(n.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(n, r) {
              this.router.triggerEvent(
                new xC(
                  n,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  r
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(b(dt), b(uC), b(void 0));
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Qr = new J("ROUTER_CONFIGURATION"),
        SD = new J("ROUTER_FORROOT_GUARD"),
        oL = [
          pl,
          { provide: Yf, useClass: UC },
          {
            provide: dt,
            useFactory: function (t, e, n, r, s, i, o, a = {}, l, u) {
              const c = new dt(null, t, e, n, r, s, i, FC(o));
              return (
                l && (c.urlHandlingStrategy = l),
                u && (c.routeReuseStrategy = u),
                (function (t, e) {
                  t.errorHandler && (e.errorHandler = t.errorHandler),
                    t.malformedUriErrorHandler &&
                      (e.malformedUriErrorHandler = t.malformedUriErrorHandler),
                    t.onSameUrlNavigation &&
                      (e.onSameUrlNavigation = t.onSameUrlNavigation),
                    t.paramsInheritanceStrategy &&
                      (e.paramsInheritanceStrategy =
                        t.paramsInheritanceStrategy),
                    t.relativeLinkResolution &&
                      (e.relativeLinkResolution = t.relativeLinkResolution),
                    t.urlUpdateStrategy &&
                      (e.urlUpdateStrategy = t.urlUpdateStrategy);
                })(a, c),
                a.enableTracing &&
                  c.events.subscribe((d) => {
                    var f, h;
                    null === (f = console.group) ||
                      void 0 === f ||
                      f.call(console, `Router Event: ${d.constructor.name}`),
                      console.log(d.toString()),
                      console.log(d),
                      null === (h = console.groupEnd) ||
                        void 0 === h ||
                        h.call(console);
                  }),
                c
              );
            },
            deps: [
              Yf,
              oi,
              pl,
              oe,
              rl,
              Br,
              dh,
              Qr,
              [class {}, new ut()],
              [class {}, new ut()],
            ],
          },
          oi,
          {
            provide: ii,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [dt],
          },
          { provide: rl, useClass: JP },
          wD,
          bD,
          class {
            preload(e, n) {
              return n().pipe(qr(() => q(null)));
            }
          },
          { provide: Qr, useValue: { enableTracing: !1 } },
        ];
      function aL() {
        return new sf("Router", dt);
      }
      let TD = (() => {
        class t {
          constructor(n, r) {}
          static forRoot(n, r) {
            return {
              ngModule: t,
              providers: [
                oL,
                ID(n),
                {
                  provide: SD,
                  useFactory: cL,
                  deps: [[dt, new ut(), new nr()]],
                },
                { provide: Qr, useValue: r || {} },
                {
                  provide: ei,
                  useFactory: uL,
                  deps: [Hr, [new _s(vf), new ut()], Qr],
                },
                { provide: gh, useFactory: lL, deps: [dt, uC, Qr] },
                {
                  provide: vD,
                  useExisting:
                    r && r.preloadingStrategy ? r.preloadingStrategy : bD,
                },
                { provide: sf, multi: !0, useFactory: aL },
                [
                  mh,
                  { provide: fo, multi: !0, useFactory: pL, deps: [mh] },
                  { provide: AD, useFactory: gL, deps: [mh] },
                  { provide: nE, multi: !0, useExisting: AD },
                ],
              ],
            };
          }
          static forChild(n) {
            return { ngModule: t, providers: [ID(n)] };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(SD, 8), b(dt, 8));
          }),
          (t.ɵmod = xn({ type: t })),
          (t.ɵinj = Ut({})),
          t
        );
      })();
      function lL(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new gh(t, e, n);
      }
      function uL(t, e, n = {}) {
        return n.useHash ? new _N(t, e) : new WE(t, e);
      }
      function cL(t) {
        return "guarded";
      }
      function ID(t) {
        return [
          { provide: hw, multi: !0, useValue: t },
          { provide: dh, multi: !0, useValue: t },
        ];
      }
      let mh = (() => {
        class t {
          constructor(n) {
            (this.injector = n),
              (this.initNavigation = !1),
              (this.destroyed = !1),
              (this.resultOfPreactivationDone = new An());
          }
          appInitializer() {
            return this.injector.get(gN, Promise.resolve(null)).then(() => {
              if (this.destroyed) return Promise.resolve(!0);
              let r = null;
              const s = new Promise((a) => (r = a)),
                i = this.injector.get(dt),
                o = this.injector.get(Qr);
              return (
                "disabled" === o.initialNavigation
                  ? (i.setUpLocationChangeListener(), r(!0))
                  : "enabled" === o.initialNavigation ||
                    "enabledBlocking" === o.initialNavigation
                  ? ((i.hooks.afterPreactivation = () =>
                      this.initNavigation
                        ? q(null)
                        : ((this.initNavigation = !0),
                          r(!0),
                          this.resultOfPreactivationDone)),
                    i.initialNavigation())
                  : r(!0),
                s
              );
            });
          }
          bootstrapListener(n) {
            const r = this.injector.get(Qr),
              s = this.injector.get(wD),
              i = this.injector.get(gh),
              o = this.injector.get(dt),
              a = this.injector.get(Ys);
            n === a.components[0] &&
              (("enabledNonBlocking" === r.initialNavigation ||
                void 0 === r.initialNavigation) &&
                o.initialNavigation(),
              s.setUpPreloading(),
              i.init(),
              o.resetRootComponentType(a.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          ngOnDestroy() {
            this.destroyed = !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(oe));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function pL(t) {
        return t.appInitializer.bind(t);
      }
      function gL(t) {
        return t.bootstrapListener.bind(t);
      }
      const AD = new J("Router Initializer"),
        yL = [];
      let _L = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = xn({ type: t })),
          (t.ɵinj = Ut({ imports: [[TD.forRoot(yL)], TD] })),
          t
        );
      })();
      function EL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng generate component xyz"), D());
      }
      function CL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng add @angular/material"), D());
      }
      function DL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng add @angular/pwa"), D());
      }
      function vL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng add _____"), D());
      }
      function bL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng test"), D());
      }
      function wL(t, e) {
        1 & t && (C(0, "pre"), ee(1, "ng build"), D());
      }
      let SL = (() => {
        class t {
          constructor() {
            this.title = "chauhantraders";
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵcmp = Wo({
            type: t,
            selectors: [["app-root"]],
            decls: 158,
            vars: 7,
            consts: [
              ["role", "banner", 1, "toolbar"],
              [
                "width",
                "40",
                "alt",
                "Angular Logo",
                "src",
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==",
              ],
              [1, "spacer"],
              [
                "aria-label",
                "Angular on twitter",
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://twitter.com/angular",
                "title",
                "Twitter",
              ],
              [
                "id",
                "twitter-logo",
                "height",
                "24",
                "data-name",
                "Logo",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "viewBox",
                "0 0 400 400",
              ],
              ["width", "400", "height", "400", "fill", "none"],
              [
                "d",
                "M153.62,301.59c94.34,0,145.94-78.16,145.94-145.94,0-2.22,0-4.43-.15-6.63A104.36,104.36,0,0,0,325,122.47a102.38,102.38,0,0,1-29.46,8.07,51.47,51.47,0,0,0,22.55-28.37,102.79,102.79,0,0,1-32.57,12.45,51.34,51.34,0,0,0-87.41,46.78A145.62,145.62,0,0,1,92.4,107.81a51.33,51.33,0,0,0,15.88,68.47A50.91,50.91,0,0,1,85,169.86c0,.21,0,.43,0,.65a51.31,51.31,0,0,0,41.15,50.28,51.21,51.21,0,0,1-23.16.88,51.35,51.35,0,0,0,47.92,35.62,102.92,102.92,0,0,1-63.7,22A104.41,104.41,0,0,1,75,278.55a145.21,145.21,0,0,0,78.62,23",
                "fill",
                "#fff",
              ],
              [
                "aria-label",
                "Angular on YouTube",
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://youtube.com/angular",
                "title",
                "YouTube",
              ],
              [
                "id",
                "youtube-logo",
                "height",
                "24",
                "width",
                "24",
                "data-name",
                "Logo",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "viewBox",
                "0 0 24 24",
                "fill",
                "#fff",
              ],
              ["d", "M0 0h24v24H0V0z", "fill", "none"],
              [
                "d",
                "M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l5.2 3-5.2 3z",
              ],
              ["role", "main", 1, "content"],
              [1, "card", "highlight-card", "card-small"],
              [
                "id",
                "rocket",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "101.678",
                "height",
                "101.678",
                "viewBox",
                "0 0 101.678 101.678",
              ],
              [
                "id",
                "Group_83",
                "data-name",
                "Group 83",
                "transform",
                "translate(-141 -696)",
              ],
              [
                "id",
                "Ellipse_8",
                "data-name",
                "Ellipse 8",
                "cx",
                "50.839",
                "cy",
                "50.839",
                "r",
                "50.839",
                "transform",
                "translate(141 696)",
                "fill",
                "#dd0031",
              ],
              [
                "id",
                "Group_47",
                "data-name",
                "Group 47",
                "transform",
                "translate(165.185 720.185)",
              ],
              [
                "id",
                "Path_33",
                "data-name",
                "Path 33",
                "d",
                "M3.4,42.615a3.084,3.084,0,0,0,3.553,3.553,21.419,21.419,0,0,0,12.215-6.107L9.511,30.4A21.419,21.419,0,0,0,3.4,42.615Z",
                "transform",
                "translate(0.371 3.363)",
                "fill",
                "#fff",
              ],
              [
                "id",
                "Path_34",
                "data-name",
                "Path 34",
                "d",
                "M53.3,3.221A3.09,3.09,0,0,0,50.081,0,48.227,48.227,0,0,0,18.322,13.437c-6-1.666-14.991-1.221-18.322,7.218A33.892,33.892,0,0,1,9.439,25.1l-.333.666a3.013,3.013,0,0,0,.555,3.553L23.985,43.641a2.9,2.9,0,0,0,3.553.555l.666-.333A33.892,33.892,0,0,1,32.647,53.3c8.55-3.664,8.884-12.326,7.218-18.322A48.227,48.227,0,0,0,53.3,3.221ZM34.424,9.772a6.439,6.439,0,1,1,9.106,9.106,6.368,6.368,0,0,1-9.106,0A6.467,6.467,0,0,1,34.424,9.772Z",
                "transform",
                "translate(0 0.005)",
                "fill",
                "#fff",
              ],
              [
                "id",
                "rocket-smoke",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "516.119",
                "height",
                "1083.632",
                "viewBox",
                "0 0 516.119 1083.632",
              ],
              [
                "id",
                "Path_40",
                "data-name",
                "Path 40",
                "d",
                "M644.6,141S143.02,215.537,147.049,870.207s342.774,201.755,342.774,201.755S404.659,847.213,388.815,762.2c-27.116-145.51-11.551-384.124,271.9-609.1C671.15,139.365,644.6,141,644.6,141Z",
                "transform",
                "translate(-147.025 -140.939)",
                "fill",
                "#f5f5f5",
              ],
              [1, "card-container"],
              [
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://angular.io/tutorial",
                1,
                "card",
              ],
              [
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "24",
                "height",
                "24",
                "viewBox",
                "0 0 24 24",
                1,
                "material-icons",
              ],
              [
                "d",
                "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",
              ],
              ["d", "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"],
              [
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://angular.io/cli",
                1,
                "card",
              ],
              [
                "d",
                "M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",
              ],
              [
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://blog.angular.io/",
                1,
                "card",
              ],
              [
                "d",
                "M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z",
              ],
              [
                "target",
                "_blank",
                "rel",
                "noopener",
                "href",
                "https://angular.io/devtools/",
                1,
                "card",
              ],
              [
                "xmlns",
                "http://www.w3.org/2000/svg",
                "enable-background",
                "new 0 0 24 24",
                "height",
                "24px",
                "viewBox",
                "0 0 24 24",
                "width",
                "24px",
                "fill",
                "#000000",
                1,
                "material-icons",
              ],
              ["fill", "none", "height", "24", "width", "24"],
              [
                "d",
                "M14.73,13.31C15.52,12.24,16,10.93,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.43,0,2.74-0.48,3.81-1.27L19.59,21L21,19.59L14.73,13.31z M9.5,14C7.01,14,5,11.99,5,9.5S7.01,5,9.5,5S14,7.01,14,9.5 S11.99,14,9.5,14z",
              ],
              [
                "points",
                "10.29,8.44 9.5,6 8.71,8.44 6.25,8.44 8.26,10.03 7.49,12.5 9.5,10.97 11.51,12.5 10.74,10.03 12.75,8.44",
              ],
              ["type", "hidden"],
              ["selection", ""],
              ["tabindex", "0", 1, "card", "card-small", 3, "click"],
              ["d", "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"],
              [1, "terminal", 3, "ngSwitch"],
              [4, "ngSwitchDefault"],
              [4, "ngSwitchCase"],
              [
                "title",
                "Animations",
                "href",
                "https://angular.io/guide/animations",
                "target",
                "_blank",
                "rel",
                "noopener",
                1,
                "circle-link",
              ],
              [
                "id",
                "Group_20",
                "data-name",
                "Group 20",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "21.813",
                "height",
                "23.453",
                "viewBox",
                "0 0 21.813 23.453",
              ],
              [
                "id",
                "Path_15",
                "data-name",
                "Path 15",
                "d",
                "M4099.584,972.736h0l-10.882,3.9,1.637,14.4,9.245,5.153,9.245-5.153,1.686-14.4Z",
                "transform",
                "translate(-4088.702 -972.736)",
                "fill",
                "#ffa726",
              ],
              [
                "id",
                "Path_16",
                "data-name",
                "Path 16",
                "d",
                "M4181.516,972.736v23.453l9.245-5.153,1.686-14.4Z",
                "transform",
                "translate(-4170.633 -972.736)",
                "fill",
                "#fb8c00",
              ],
              [
                "id",
                "Path_17",
                "data-name",
                "Path 17",
                "d",
                "M4137.529,1076.127l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                "transform",
                "translate(-4125.003 -1058.315)",
                "fill",
                "#ffe0b2",
              ],
              [
                "id",
                "Path_18",
                "data-name",
                "Path 18",
                "d",
                "M4137.529,1051.705l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                "transform",
                "translate(-4125.003 -1036.757)",
                "fill",
                "#fff3e0",
              ],
              [
                "id",
                "Path_19",
                "data-name",
                "Path 19",
                "d",
                "M4137.529,1027.283l-7.7-3.723,4.417-2.721,7.753,3.723Z",
                "transform",
                "translate(-4125.003 -1015.199)",
                "fill",
                "#fff",
              ],
              [
                "title",
                "CLI",
                "href",
                "https://cli.angular.io/",
                "target",
                "_blank",
                "rel",
                "noopener",
                1,
                "circle-link",
              ],
              [
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "21.762",
                "height",
                "23.447",
                "viewBox",
                "0 0 21.762 23.447",
              ],
              [
                "id",
                "Group_21",
                "data-name",
                "Group 21",
                "transform",
                "translate(0)",
              ],
              [
                "id",
                "Path_20",
                "data-name",
                "Path 20",
                "d",
                "M2660.313,313.618h0l-10.833,3.9,1.637,14.4,9.2,5.152,9.244-5.152,1.685-14.4Z",
                "transform",
                "translate(-2649.48 -313.618)",
                "fill",
                "#37474f",
              ],
              [
                "id",
                "Path_21",
                "data-name",
                "Path 21",
                "d",
                "M2741.883,313.618v23.447l9.244-5.152,1.685-14.4Z",
                "transform",
                "translate(-2731.05 -313.618)",
                "fill",
                "#263238",
              ],
              [
                "id",
                "Path_22",
                "data-name",
                "Path 22",
                "d",
                "M2692.293,379.169h11.724V368.618h-11.724Zm11.159-.6h-10.608v-9.345h10.621v9.345Z",
                "transform",
                "translate(-2687.274 -362.17)",
                "fill",
                "#fff",
              ],
              [
                "id",
                "Path_23",
                "data-name",
                "Path 23",
                "d",
                "M2709.331,393.688l.4.416,2.265-2.28-2.294-2.294-.4.4,1.893,1.893Z",
                "transform",
                "translate(-2702.289 -380.631)",
                "fill",
                "#fff",
              ],
              [
                "id",
                "Rectangle_12",
                "data-name",
                "Rectangle 12",
                "width",
                "3.517",
                "height",
                "0.469",
                "transform",
                "translate(9.709 13.744)",
                "fill",
                "#fff",
              ],
              [
                "title",
                "Find a Local Meetup",
                "href",
                "https://www.meetup.com/find/?keywords=angular",
                "target",
                "_blank",
                "rel",
                "noopener",
                1,
                "circle-link",
              ],
              [
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "24.607",
                "height",
                "23.447",
                "viewBox",
                "0 0 24.607 23.447",
              ],
              [
                "id",
                "logo--mSwarm",
                "d",
                "M21.221,14.95A4.393,4.393,0,0,1,17.6,19.281a4.452,4.452,0,0,1-.8.069c-.09,0-.125.035-.154.117a2.939,2.939,0,0,1-2.506,2.091,2.868,2.868,0,0,1-2.248-.624.168.168,0,0,0-.245-.005,3.926,3.926,0,0,1-2.589.741,4.015,4.015,0,0,1-3.7-3.347,2.7,2.7,0,0,1-.043-.38c0-.106-.042-.146-.143-.166a3.524,3.524,0,0,1-1.516-.69A3.623,3.623,0,0,1,2.23,14.557a3.66,3.66,0,0,1,1.077-3.085.138.138,0,0,0,.026-.2,3.348,3.348,0,0,1-.451-1.821,3.46,3.46,0,0,1,2.749-3.28.44.44,0,0,0,.355-.281,5.072,5.072,0,0,1,3.863-3,5.028,5.028,0,0,1,3.555.666.31.31,0,0,0,.271.03A4.5,4.5,0,0,1,18.3,4.7a4.4,4.4,0,0,1,1.334,2.751,3.658,3.658,0,0,1,.022.706.131.131,0,0,0,.1.157,2.432,2.432,0,0,1,1.574,1.645,2.464,2.464,0,0,1-.7,2.616c-.065.064-.051.1-.014.166A4.321,4.321,0,0,1,21.221,14.95ZM13.4,14.607a2.09,2.09,0,0,0,1.409,1.982,4.7,4.7,0,0,0,1.275.221,1.807,1.807,0,0,0,.9-.151.542.542,0,0,0,.321-.545.558.558,0,0,0-.359-.534,1.2,1.2,0,0,0-.254-.078c-.262-.047-.526-.086-.787-.138a.674.674,0,0,1-.617-.75,3.394,3.394,0,0,1,.218-1.109c.217-.658.509-1.286.79-1.918a15.609,15.609,0,0,0,.745-1.86,1.95,1.95,0,0,0,.06-1.073,1.286,1.286,0,0,0-1.051-1.033,1.977,1.977,0,0,0-1.521.2.339.339,0,0,1-.446-.042c-.1-.092-.2-.189-.307-.284a1.214,1.214,0,0,0-1.643-.061,7.563,7.563,0,0,1-.614.512A.588.588,0,0,1,10.883,8c-.215-.115-.437-.215-.659-.316a2.153,2.153,0,0,0-.695-.248A2.091,2.091,0,0,0,7.541,8.562a9.915,9.915,0,0,0-.405.986c-.559,1.545-1.015,3.123-1.487,4.7a1.528,1.528,0,0,0,.634,1.777,1.755,1.755,0,0,0,1.5.211,1.35,1.35,0,0,0,.824-.858c.543-1.281,1.032-2.584,1.55-3.875.142-.355.28-.712.432-1.064a.548.548,0,0,1,.851-.24.622.622,0,0,1,.185.539,2.161,2.161,0,0,1-.181.621c-.337.852-.68,1.7-1.018,2.552a2.564,2.564,0,0,0-.173.528.624.624,0,0,0,.333.71,1.073,1.073,0,0,0,.814.034,1.22,1.22,0,0,0,.657-.655q.758-1.488,1.511-2.978.35-.687.709-1.37a1.073,1.073,0,0,1,.357-.434.43.43,0,0,1,.463-.016.373.373,0,0,1,.153.387.7.7,0,0,1-.057.236c-.065.157-.127.316-.2.469-.42.883-.846,1.763-1.262,2.648A2.463,2.463,0,0,0,13.4,14.607Zm5.888,6.508a1.09,1.09,0,0,0-2.179.006,1.09,1.09,0,0,0,2.179-.006ZM1.028,12.139a1.038,1.038,0,1,0,.01-2.075,1.038,1.038,0,0,0-.01,2.075ZM13.782.528a1.027,1.027,0,1,0-.011,2.055A1.027,1.027,0,0,0,13.782.528ZM22.21,6.95a.882.882,0,0,0-1.763.011A.882.882,0,0,0,22.21,6.95ZM4.153,4.439a.785.785,0,1,0,.787-.78A.766.766,0,0,0,4.153,4.439Zm8.221,18.22a.676.676,0,1,0-.677.666A.671.671,0,0,0,12.374,22.658ZM22.872,12.2a.674.674,0,0,0-.665.665.656.656,0,0,0,.655.643.634.634,0,0,0,.655-.644A.654.654,0,0,0,22.872,12.2ZM7.171-.123A.546.546,0,0,0,6.613.43a.553.553,0,1,0,1.106,0A.539.539,0,0,0,7.171-.123ZM24.119,9.234a.507.507,0,0,0-.493.488.494.494,0,0,0,.494.494.48.48,0,0,0,.487-.483A.491.491,0,0,0,24.119,9.234Zm-19.454,9.7a.5.5,0,0,0-.488-.488.491.491,0,0,0-.487.5.483.483,0,0,0,.491.479A.49.49,0,0,0,4.665,18.936Z",
                "transform",
                "translate(0 0.123)",
                "fill",
                "#f64060",
              ],
              [
                "title",
                "Join the Conversation on Discord",
                "href",
                "https://discord.gg/angular",
                "target",
                "_blank",
                "rel",
                "noopener",
                1,
                "circle-link",
              ],
              [
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "26",
                "height",
                "26",
                "viewBox",
                "0 0 245 240",
              ],
              [
                "d",
                "M104.4 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1.1-6.1-4.5-11.1-10.2-11.1zM140.9 103.9c-5.7 0-10.2 5-10.2 11.1s4.6 11.1 10.2 11.1c5.7 0 10.2-5 10.2-11.1s-4.5-11.1-10.2-11.1z",
              ],
              [
                "d",
                "M189.5 20h-134C44.2 20 35 29.2 35 40.6v135.2c0 11.4 9.2 20.6 20.5 20.6h113.4l-5.3-18.5 12.8 11.9 12.1 11.2 21.5 19V40.6c0-11.4-9.2-20.6-20.5-20.6zm-38.6 130.6s-3.6-4.3-6.6-8.1c13.1-3.7 18.1-11.9 18.1-11.9-4.1 2.7-8 4.6-11.5 5.9-5 2.1-9.8 3.5-14.5 4.3-9.6 1.8-18.4 1.3-25.9-.1-5.7-1.1-10.6-2.7-14.7-4.3-2.3-.9-4.8-2-7.3-3.4-.3-.2-.6-.3-.9-.5-.2-.1-.3-.2-.4-.3-1.8-1-2.8-1.7-2.8-1.7s4.8 8 17.5 11.8c-3 3.8-6.7 8.3-6.7 8.3-22.1-.7-30.5-15.2-30.5-15.2 0-32.2 14.4-58.3 14.4-58.3 14.4-10.8 28.1-10.5 28.1-10.5l1 1.2c-18 5.2-26.3 13.1-26.3 13.1s2.2-1.2 5.9-2.9c10.7-4.7 19.2-6 22.7-6.3.6-.1 1.1-.2 1.7-.2 6.1-.8 13-1 20.2-.2 9.5 1.1 19.7 3.9 30.1 9.6 0 0-7.9-7.5-24.9-12.7l1.4-1.6s13.7-.3 28.1 10.5c0 0 14.4 26.1 14.4 58.3 0 0-8.5 14.5-30.6 15.2z",
              ],
              [
                "href",
                "https://github.com/angular/angular",
                "target",
                "_blank",
                "rel",
                "noopener",
              ],
              [1, "github-star-badge"],
              ["d", "M0 0h24v24H0z", "fill", "none"],
              [
                "d",
                "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
              ],
              [
                "d",
                "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
                "fill",
                "#1976d2",
              ],
              [
                "id",
                "clouds",
                "xmlns",
                "http://www.w3.org/2000/svg",
                "width",
                "2611.084",
                "height",
                "485.677",
                "viewBox",
                "0 0 2611.084 485.677",
              ],
              [
                "id",
                "Path_39",
                "data-name",
                "Path 39",
                "d",
                "M2379.709,863.793c10-93-77-171-168-149-52-114-225-105-264,15-75,3-140,59-152,133-30,2.83-66.725,9.829-93.5,26.25-26.771-16.421-63.5-23.42-93.5-26.25-12-74-77-130-152-133-39-120-212-129-264-15-54.084-13.075-106.753,9.173-138.488,48.9-31.734-39.726-84.4-61.974-138.487-48.9-52-114-225-105-264,15a162.027,162.027,0,0,0-103.147,43.044c-30.633-45.365-87.1-72.091-145.206-58.044-52-114-225-105-264,15-75,3-140,59-152,133-53,5-127,23-130,83-2,42,35,72,70,86,49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33,61.112,8.015,113.854-5.72,150.492-29.764a165.62,165.62,0,0,0,110.861-3.236c47,94,178,113,251,33,31.385,4.116,60.563,2.495,86.487-3.311,25.924,5.806,55.1,7.427,86.488,3.311,73,80,204,61,251-33a165.625,165.625,0,0,0,120,0c51,13,108,15,157-5a147.188,147.188,0,0,0,33.5-18.694,147.217,147.217,0,0,0,33.5,18.694c49,20,106,18,157,5a165.625,165.625,0,0,0,120,0c47,94,178,113,251,33C2446.709,1093.793,2554.709,922.793,2379.709,863.793Z",
                "transform",
                "translate(142.69 -634.312)",
                "fill",
                "#eee",
              ],
            ],
            template: function (n, r) {
              if (1 & n) {
                const s = E();
                C(0, "div", 0),
                  O(1, "img", 1),
                  C(2, "span"),
                  ee(3, "Welcome"),
                  D(),
                  O(4, "div", 2),
                  C(5, "a", 3),
                  he(),
                  C(6, "svg", 4),
                  O(7, "rect", 5),
                  O(8, "path", 6),
                  D(),
                  D(),
                  pe(),
                  C(9, "a", 7),
                  he(),
                  C(10, "svg", 8),
                  O(11, "path", 9),
                  O(12, "path", 10),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(13, "div", 11),
                  C(14, "div", 12),
                  he(),
                  C(15, "svg", 13),
                  C(16, "title"),
                  ee(17, "Rocket Ship"),
                  D(),
                  C(18, "g", 14),
                  O(19, "circle", 15),
                  C(20, "g", 16),
                  O(21, "path", 17),
                  O(22, "path", 18),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(23, "span"),
                  ee(24),
                  D(),
                  he(),
                  C(25, "svg", 19),
                  C(26, "title"),
                  ee(27, "Rocket Ship Smoke"),
                  D(),
                  O(28, "path", 20),
                  D(),
                  D(),
                  pe(),
                  C(29, "h2"),
                  ee(30, "Resources"),
                  D(),
                  C(31, "p"),
                  ee(32, "Here are some links to help you get started:"),
                  D(),
                  C(33, "div", 21),
                  C(34, "a", 22),
                  he(),
                  C(35, "svg", 23),
                  O(36, "path", 24),
                  D(),
                  pe(),
                  C(37, "span"),
                  ee(38, "Learn Angular"),
                  D(),
                  he(),
                  C(39, "svg", 23),
                  O(40, "path", 25),
                  D(),
                  D(),
                  pe(),
                  C(41, "a", 26),
                  he(),
                  C(42, "svg", 23),
                  O(43, "path", 27),
                  D(),
                  pe(),
                  C(44, "span"),
                  ee(45, "CLI Documentation"),
                  D(),
                  he(),
                  C(46, "svg", 23),
                  O(47, "path", 25),
                  D(),
                  D(),
                  pe(),
                  C(48, "a", 28),
                  he(),
                  C(49, "svg", 23),
                  O(50, "path", 29),
                  D(),
                  pe(),
                  C(51, "span"),
                  ee(52, "Angular Blog"),
                  D(),
                  he(),
                  C(53, "svg", 23),
                  O(54, "path", 25),
                  D(),
                  D(),
                  pe(),
                  C(55, "a", 30),
                  he(),
                  C(56, "svg", 31),
                  C(57, "g"),
                  O(58, "rect", 32),
                  D(),
                  C(59, "g"),
                  C(60, "g"),
                  O(61, "path", 33),
                  O(62, "polygon", 34),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(63, "span"),
                  ee(64, "Angular DevTools"),
                  D(),
                  he(),
                  C(65, "svg", 23),
                  O(66, "path", 25),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(67, "h2"),
                  ee(68, "Next Steps"),
                  D(),
                  C(69, "p"),
                  ee(70, "What do you want to do next with your app?"),
                  D(),
                  O(71, "input", 35, 36),
                  C(73, "div", 21),
                  C(74, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "component");
                  }),
                  he(),
                  C(75, "svg", 23),
                  O(76, "path", 38),
                  D(),
                  pe(),
                  C(77, "span"),
                  ee(78, "New Component"),
                  D(),
                  D(),
                  C(79, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "material");
                  }),
                  he(),
                  C(80, "svg", 23),
                  O(81, "path", 38),
                  D(),
                  pe(),
                  C(82, "span"),
                  ee(83, "Angular Material"),
                  D(),
                  D(),
                  C(84, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "pwa");
                  }),
                  he(),
                  C(85, "svg", 23),
                  O(86, "path", 38),
                  D(),
                  pe(),
                  C(87, "span"),
                  ee(88, "Add PWA Support"),
                  D(),
                  D(),
                  C(89, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "dependency");
                  }),
                  he(),
                  C(90, "svg", 23),
                  O(91, "path", 38),
                  D(),
                  pe(),
                  C(92, "span"),
                  ee(93, "Add Dependency"),
                  D(),
                  D(),
                  C(94, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "test");
                  }),
                  he(),
                  C(95, "svg", 23),
                  O(96, "path", 38),
                  D(),
                  pe(),
                  C(97, "span"),
                  ee(98, "Run and Watch Tests"),
                  D(),
                  D(),
                  C(99, "button", 37),
                  _n("click", function () {
                    return Sr(s), (or(72).value = "build");
                  }),
                  he(),
                  C(100, "svg", 23),
                  O(101, "path", 38),
                  D(),
                  pe(),
                  C(102, "span"),
                  ee(103, "Build for Production"),
                  D(),
                  D(),
                  D(),
                  C(104, "div", 39),
                  Or(105, EL, 2, 0, "pre", 40),
                  Or(106, CL, 2, 0, "pre", 41),
                  Or(107, DL, 2, 0, "pre", 41),
                  Or(108, vL, 2, 0, "pre", 41),
                  Or(109, bL, 2, 0, "pre", 41),
                  Or(110, wL, 2, 0, "pre", 41),
                  D(),
                  C(111, "div", 21),
                  C(112, "a", 42),
                  he(),
                  C(113, "svg", 43),
                  O(114, "path", 44),
                  O(115, "path", 45),
                  O(116, "path", 46),
                  O(117, "path", 47),
                  O(118, "path", 48),
                  D(),
                  D(),
                  pe(),
                  C(119, "a", 49),
                  he(),
                  C(120, "svg", 50),
                  C(121, "title"),
                  ee(122, "Angular CLI Logo"),
                  D(),
                  C(123, "g", 51),
                  O(124, "path", 52),
                  O(125, "path", 53),
                  O(126, "path", 54),
                  O(127, "path", 55),
                  O(128, "rect", 56),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(129, "a", 57),
                  he(),
                  C(130, "svg", 58),
                  C(131, "title"),
                  ee(132, "Meetup Logo"),
                  D(),
                  O(133, "path", 59),
                  D(),
                  D(),
                  pe(),
                  C(134, "a", 60),
                  he(),
                  C(135, "svg", 61),
                  C(136, "title"),
                  ee(137, "Discord Logo"),
                  D(),
                  O(138, "path", 62),
                  O(139, "path", 63),
                  D(),
                  D(),
                  D(),
                  pe(),
                  C(140, "footer"),
                  ee(141, " Love Angular?\xa0 "),
                  C(142, "a", 64),
                  ee(143, " Give our repo a star. "),
                  C(144, "div", 65),
                  he(),
                  C(145, "svg", 23),
                  O(146, "path", 66),
                  O(147, "path", 67),
                  D(),
                  ee(148, " Star "),
                  D(),
                  D(),
                  pe(),
                  C(149, "a", 64),
                  he(),
                  C(150, "svg", 23),
                  O(151, "path", 68),
                  O(152, "path", 66),
                  D(),
                  D(),
                  D(),
                  C(153, "svg", 69),
                  C(154, "title"),
                  ee(155, "Gray Clouds Background"),
                  D(),
                  O(156, "path", 70),
                  D(),
                  D(),
                  pe(),
                  O(157, "router-outlet");
              }
              if (2 & n) {
                const s = or(72);
                rr(24),
                  La("", r.title, " app is running!"),
                  rr(80),
                  ar("ngSwitch", s.value),
                  rr(2),
                  ar("ngSwitchCase", "material"),
                  rr(1),
                  ar("ngSwitchCase", "pwa"),
                  rr(1),
                  ar("ngSwitchCase", "dependency"),
                  rr(1),
                  ar("ngSwitchCase", "test"),
                  rr(1),
                  ar("ngSwitchCase", "build");
              }
            },
            directives: [Sl, iC, sC, ph],
            styles: [
              "",
              '[_nghost-%COMP%] {\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n    font-size: 14px;\n    color: #333;\n    box-sizing: border-box;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n  }\n\n  h1[_ngcontent-%COMP%], h2[_ngcontent-%COMP%], h3[_ngcontent-%COMP%], h4[_ngcontent-%COMP%], h5[_ngcontent-%COMP%], h6[_ngcontent-%COMP%] {\n    margin: 8px 0;\n  }\n\n  p[_ngcontent-%COMP%] {\n    margin: 0;\n  }\n\n  .spacer[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n\n  .toolbar[_ngcontent-%COMP%] {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 60px;\n    display: flex;\n    align-items: center;\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 8px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%] {\n    height: 40px;\n    margin: 0 16px;\n  }\n\n  .toolbar[_ngcontent-%COMP%]   #twitter-logo[_ngcontent-%COMP%]:hover, .toolbar[_ngcontent-%COMP%]   #youtube-logo[_ngcontent-%COMP%]:hover {\n    opacity: 0.8;\n  }\n\n  .content[_ngcontent-%COMP%] {\n    display: flex;\n    margin: 82px auto 32px;\n    padding: 0 16px;\n    max-width: 960px;\n    flex-direction: column;\n    align-items: center;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%] {\n    height: 24px;\n    width: auto;\n  }\n\n  svg.material-icons[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 8px;\n  }\n\n  .card[_ngcontent-%COMP%]   svg.material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: #888;\n  }\n\n  .card-container[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    justify-content: center;\n    margin-top: 16px;\n  }\n\n  .card[_ngcontent-%COMP%] {\n    all: unset;\n    border-radius: 4px;\n    border: 1px solid #eee;\n    background-color: #fafafa;\n    height: 40px;\n    width: 200px;\n    margin: 0 8px 16px;\n    padding: 16px;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    transition: all 0.2s ease-in-out;\n    line-height: 24px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(:last-child) {\n    margin-right: 0;\n  }\n\n  .card.card-small[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 168px;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card) {\n    cursor: pointer;\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover {\n    transform: translateY(-3px);\n    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.35);\n  }\n\n  .card-container[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:not(.highlight-card):hover   .material-icons[_ngcontent-%COMP%]   path[_ngcontent-%COMP%] {\n    fill: rgb(105, 103, 103);\n  }\n\n  .card.highlight-card[_ngcontent-%COMP%] {\n    background-color: #1976d2;\n    color: white;\n    font-weight: 600;\n    border: none;\n    width: auto;\n    min-width: 30%;\n    position: relative;\n  }\n\n  .card.card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n    margin-left: 60px;\n  }\n\n  svg#rocket[_ngcontent-%COMP%] {\n    width: 80px;\n    position: absolute;\n    left: -10px;\n    top: -24px;\n  }\n\n  svg#rocket-smoke[_ngcontent-%COMP%] {\n    height: calc(100vh - 95px);\n    position: absolute;\n    top: 10px;\n    right: 180px;\n    z-index: -10;\n  }\n\n  a[_ngcontent-%COMP%], a[_ngcontent-%COMP%]:visited, a[_ngcontent-%COMP%]:hover {\n    color: #1976d2;\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    color: #125699;\n  }\n\n  .terminal[_ngcontent-%COMP%] {\n    position: relative;\n    width: 80%;\n    max-width: 600px;\n    border-radius: 6px;\n    padding-top: 45px;\n    margin-top: 8px;\n    overflow: hidden;\n    background-color: rgb(15, 15, 16);\n  }\n\n  .terminal[_ngcontent-%COMP%]::before {\n    content: "\\2022 \\2022 \\2022";\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 4px;\n    background: rgb(58, 58, 58);\n    color: #c2c3c4;\n    width: 100%;\n    font-size: 2rem;\n    line-height: 0;\n    padding: 14px 0;\n    text-indent: 4px;\n  }\n\n  .terminal[_ngcontent-%COMP%]   pre[_ngcontent-%COMP%] {\n    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n    color: white;\n    padding: 0 1rem 1rem;\n    margin: 0;\n  }\n\n  .circle-link[_ngcontent-%COMP%] {\n    height: 40px;\n    width: 40px;\n    border-radius: 40px;\n    margin: 8px;\n    background-color: white;\n    border: 1px solid #eeeeee;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    cursor: pointer;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n    transition: 1s ease-out;\n  }\n\n  .circle-link[_ngcontent-%COMP%]:hover {\n    transform: translateY(-0.25rem);\n    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);\n  }\n\n  footer[_ngcontent-%COMP%] {\n    margin-top: 8px;\n    display: flex;\n    align-items: center;\n    line-height: 20px;\n  }\n\n  footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%] {\n    color: #24292e;\n    display: flex;\n    align-items: center;\n    font-size: 12px;\n    padding: 3px 10px;\n    border: 1px solid rgba(27,31,35,.2);\n    border-radius: 3px;\n    background-image: linear-gradient(-180deg,#fafbfc,#eff3f6 90%);\n    margin-left: 4px;\n    font-weight: 600;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]:hover {\n    background-image: linear-gradient(-180deg,#f0f3f6,#e6ebf1 90%);\n    border-color: rgba(27,31,35,.35);\n    background-position: -.5em;\n  }\n\n  .github-star-badge[_ngcontent-%COMP%]   .material-icons[_ngcontent-%COMP%] {\n    height: 16px;\n    width: 16px;\n    margin-right: 4px;\n  }\n\n  svg#clouds[_ngcontent-%COMP%] {\n    position: fixed;\n    bottom: -160px;\n    left: -230px;\n    z-index: -10;\n    width: 1920px;\n  }\n\n  \n  @media screen and (max-width: 767px) {\n    .card-container[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.circle-link), .terminal[_ngcontent-%COMP%] {\n      width: 100%;\n    }\n\n    .card[_ngcontent-%COMP%]:not(.highlight-card) {\n      height: 16px;\n      margin: 8px 0;\n    }\n\n    .card.highlight-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n      margin-left: 72px;\n    }\n\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      right: 120px;\n      transform: rotate(-5deg);\n    }\n  }\n\n  @media screen and (max-width: 575px) {\n    svg#rocket-smoke[_ngcontent-%COMP%] {\n      display: none;\n      visibility: hidden;\n    }\n  }',
            ],
          })),
          t
        );
      })();
      class MD {}
      const qn = "*";
      function RD(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function PD(t) {
        return { type: 6, styles: t, offset: null };
      }
      function xD(t) {
        Promise.resolve(null).then(t);
      }
      class li {
        constructor(e = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          xD(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this._started = !1;
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class ND {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let n = 0,
            r = 0,
            s = 0;
          const i = this.players.length;
          0 == i
            ? xD(() => this._onFinish())
            : this.players.forEach((o) => {
                o.onDone(() => {
                  ++n == i && this._onFinish();
                }),
                  o.onDestroy(() => {
                    ++r == i && this._onDestroy();
                  }),
                  o.onStart(() => {
                    ++s == i && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (o, a) => Math.max(o, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const n = e * this.totalTime;
          this.players.forEach((r) => {
            const s = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(s);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      function OD() {
        return "undefined" != typeof window && void 0 !== window.document;
      }
      function _h() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function mr(t) {
        switch (t.length) {
          case 0:
            return new li();
          case 1:
            return t[0];
          default:
            return new ND(t);
        }
      }
      function FD(t, e, n, r, s = {}, i = {}) {
        const o = [],
          a = [];
        let l = -1,
          u = null;
        if (
          (r.forEach((c) => {
            const d = c.offset,
              f = d == l,
              h = (f && u) || {};
            Object.keys(c).forEach((p) => {
              let m = p,
                g = c[p];
              if ("offset" !== p)
                switch (((m = e.normalizePropertyName(m, o)), g)) {
                  case "!":
                    g = s[p];
                    break;
                  case qn:
                    g = i[p];
                    break;
                  default:
                    g = e.normalizeStyleValue(p, m, g, o);
                }
              h[m] = g;
            }),
              f || a.push(h),
              (u = h),
              (l = d);
          }),
          o.length)
        ) {
          const c = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${c}${o.join(c)}`
          );
        }
        return a;
      }
      function Eh(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(() => r(n && Ch(n, "start", t)));
            break;
          case "done":
            t.onDone(() => r(n && Ch(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => r(n && Ch(n, "destroy", t)));
        }
      }
      function Ch(t, e, n) {
        const r = n.totalTime,
          i = Dh(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == r ? t.totalTime : r,
            !!n.disabled
          ),
          o = t._data;
        return null != o && (i._data = o), i;
      }
      function Dh(t, e, n, r, s = "", i = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: r,
          phaseName: s,
          totalTime: i,
          disabled: !!o,
        };
      }
      function bt(t, e, n) {
        let r;
        return (
          t instanceof Map
            ? ((r = t.get(e)), r || t.set(e, (r = n)))
            : ((r = t[e]), r || (r = t[e] = n)),
          r
        );
      }
      function kD(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let vh = (t, e) => !1,
        bh = (t, e) => !1,
        LD = (t, e, n) => [];
      const VD = _h();
      (VD || "undefined" != typeof Element) &&
        ((vh = OD()
          ? (t, e) => {
              for (; e && e !== document.documentElement; ) {
                if (e === t) return !0;
                e = e.parentNode || e.host;
              }
              return !1;
            }
          : (t, e) => t.contains(e)),
        (bh = (() => {
          if (VD || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (n, r) => e.apply(n, [r]) : bh;
          }
        })()),
        (LD = (t, e, n) => {
          let r = [];
          if (n) {
            const s = t.querySelectorAll(e);
            for (let i = 0; i < s.length; i++) r.push(s[i]);
          } else {
            const s = t.querySelector(e);
            s && r.push(s);
          }
          return r;
        }));
      let Kr = null,
        jD = !1;
      function wh(t) {
        Kr ||
          ((Kr = ("undefined" != typeof document ? document.body : null) || {}),
          (jD = !!Kr.style && "WebkitAppearance" in Kr.style));
        let e = !0;
        return (
          Kr.style &&
            !(function (t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in Kr.style),
            !e &&
              jD &&
              (e =
                "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in
                Kr.style)),
          e
        );
      }
      const Sh = bh,
        Th = vh,
        Ih = LD;
      function BD(t) {
        const e = {};
        return (
          Object.keys(t).forEach((n) => {
            const r = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[r] = t[n];
          }),
          e
        );
      }
      let $D = (() => {
          class t {
            validateStyleProperty(n) {
              return wh(n);
            }
            matchesElement(n, r) {
              return Sh(n, r);
            }
            containsElement(n, r) {
              return Th(n, r);
            }
            query(n, r, s) {
              return Ih(n, r, s);
            }
            computeStyle(n, r, s) {
              return s || "";
            }
            animate(n, r, s, i, o, a = [], l) {
              return new li(s, i);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = U({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ah = (() => {
          class t {}
          return (t.NOOP = new $D()), t;
        })();
      const Mh = "ng-enter",
        Ql = "ng-leave",
        Kl = "ng-trigger",
        Zl = ".ng-trigger",
        HD = "ng-animating",
        Rh = ".ng-animating";
      function Zr(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : Ph(parseFloat(e[1]), e[2]);
      }
      function Ph(t, e) {
        return "s" === e ? 1e3 * t : t;
      }
      function Yl(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function (t, e, n) {
              let s,
                i = 0,
                o = "";
              if ("string" == typeof t) {
                const a = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                s = Ph(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (i = Ph(parseFloat(l), a[4]));
                const u = a[5];
                u && (o = u);
              } else s = t;
              if (!n) {
                let a = !1,
                  l = e.length;
                s < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (a = !0)),
                  i < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (a = !0)),
                  a &&
                    e.splice(
                      l,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: s, delay: i, easing: o };
            })(t, e, n);
      }
      function ui(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function yr(t, e, n = {}) {
        if (e) for (let r in t) n[r] = t[r];
        else ui(t, n);
        return n;
      }
      function zD(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function WD(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const r = t.style.item(n);
          e += zD(0, r, t.style.getPropertyValue(r));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += zD(0, OL(n), t.style[n]));
        t.setAttribute("style", e);
      }
      function wn(t, e, n) {
        t.style &&
          (Object.keys(e).forEach((r) => {
            const s = Nh(r);
            n && !n.hasOwnProperty(r) && (n[r] = t.style[s]),
              (t.style[s] = e[r]);
          }),
          _h() && WD(t));
      }
      function Yr(t, e) {
        t.style &&
          (Object.keys(e).forEach((n) => {
            const r = Nh(n);
            t.style[r] = "";
          }),
          _h() && WD(t));
      }
      function Oo(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : RD(t)) : t;
      }
      const xh = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function GD(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = xh.exec(t)); ) e.push(n[1]);
          xh.lastIndex = 0;
        }
        return e;
      }
      function Jl(t, e, n) {
        const r = t.toString(),
          s = r.replace(xh, (i, o) => {
            let a = e[o];
            return (
              e.hasOwnProperty(o) ||
                (n.push(`Please provide a value for the animation param ${o}`),
                (a = "")),
              a.toString()
            );
          });
        return s == r ? t : s;
      }
      function Xl(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const NL = /-+([a-z0-9])/g;
      function Nh(t) {
        return t.replace(NL, (...e) => e[1].toUpperCase());
      }
      function OL(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function QD(t, e) {
        return 0 === t || 0 === e;
      }
      function KD(t, e, n) {
        const r = Object.keys(n);
        if (r.length && e.length) {
          let i = e[0],
            o = [];
          if (
            (r.forEach((a) => {
              i.hasOwnProperty(a) || o.push(a), (i[a] = n[a]);
            }),
            o.length)
          )
            for (var s = 1; s < e.length; s++) {
              let a = e[s];
              o.forEach(function (l) {
                a[l] = Oh(t, l);
              });
            }
        }
        return e;
      }
      function wt(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              `Unable to resolve animation metadata node #${e.type}`
            );
        }
      }
      function Oh(t, e) {
        return window.getComputedStyle(t)[e];
      }
      function FL(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((r) =>
                (function (t, e, n) {
                  if (":" == t[0]) {
                    const l = (function (t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof l) return void e.push(l);
                    t = l;
                  }
                  const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const s = r[1],
                    i = r[2],
                    o = r[3];
                  e.push(ZD(s, o));
                  "<" == i[0] && !("*" == s && "*" == o) && e.push(ZD(o, s));
                })(r, n, e)
              )
            : n.push(t),
          n
        );
      }
      const tu = new Set(["true", "1"]),
        nu = new Set(["false", "0"]);
      function ZD(t, e) {
        const n = tu.has(t) || nu.has(t),
          r = tu.has(e) || nu.has(e);
        return (s, i) => {
          let o = "*" == t || t == s,
            a = "*" == e || e == i;
          return (
            !o && n && "boolean" == typeof s && (o = s ? tu.has(t) : nu.has(t)),
            !a && r && "boolean" == typeof i && (a = i ? tu.has(e) : nu.has(e)),
            o && a
          );
        };
      }
      const VL = new RegExp("s*:selfs*,?", "g");
      function Fh(t, e, n) {
        return new jL(t).build(e, n);
      }
      class jL {
        constructor(e) {
          this._driver = e;
        }
        build(e, n) {
          const r = new UL(n);
          return this._resetContextStyleTimingState(r), wt(this, Oo(e), r);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = {}),
            (e.collectedStyles[""] = {}),
            (e.currentTime = 0);
        }
        visitTrigger(e, n) {
          let r = (n.queryCount = 0),
            s = (n.depCount = 0);
          const i = [],
            o = [];
          return (
            "@" == e.name.charAt(0) &&
              n.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), i.push(this.visitState(l, n));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, n);
                (r += l.queryCount), (s += l.depCount), o.push(l);
              } else
                n.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: e.name,
              states: i,
              transitions: o,
              queryCount: r,
              depCount: s,
              options: null,
            }
          );
        }
        visitState(e, n) {
          const r = this.visitStyle(e.styles, n),
            s = (e.options && e.options.params) || null;
          if (r.containsDynamicStyles) {
            const i = new Set(),
              o = s || {};
            if (
              (r.styles.forEach((a) => {
                if (ru(a)) {
                  const l = a;
                  Object.keys(l).forEach((u) => {
                    GD(l[u]).forEach((c) => {
                      o.hasOwnProperty(c) || i.add(c);
                    });
                  });
                }
              }),
              i.size)
            ) {
              const a = Xl(i.values());
              n.errors.push(
                `state("${
                  e.name
                }", ...) must define default values for all the following style substitutions: ${a.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: s ? { params: s } : null,
          };
        }
        visitTransition(e, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = wt(this, Oo(e.animation), n);
          return {
            type: 1,
            matchers: FL(e.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: Jr(e.options),
          };
        }
        visitSequence(e, n) {
          return {
            type: 2,
            steps: e.steps.map((r) => wt(this, r, n)),
            options: Jr(e.options),
          };
        }
        visitGroup(e, n) {
          const r = n.currentTime;
          let s = 0;
          const i = e.steps.map((o) => {
            n.currentTime = r;
            const a = wt(this, o, n);
            return (s = Math.max(s, n.currentTime)), a;
          });
          return (
            (n.currentTime = s), { type: 3, steps: i, options: Jr(e.options) }
          );
        }
        visitAnimate(e, n) {
          const r = (function (t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return kh(Yl(t, e).duration, 0, "");
            const r = t;
            if (
              r
                .split(/\s+/)
                .some((i) => "{" == i.charAt(0) && "{" == i.charAt(1))
            ) {
              const i = kh(0, 0, "");
              return (i.dynamic = !0), (i.strValue = r), i;
            }
            return (n = n || Yl(r, e)), kh(n.duration, n.delay, n.easing);
          })(e.timings, n.errors);
          n.currentAnimateTimings = r;
          let s,
            i = e.styles ? e.styles : PD({});
          if (5 == i.type) s = this.visitKeyframes(i, n);
          else {
            let o = e.styles,
              a = !1;
            if (!o) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (o = PD(u));
            }
            n.currentTime += r.duration + r.delay;
            const l = this.visitStyle(o, n);
            (l.isEmptyStep = a), (s = l);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: s, options: null }
          );
        }
        visitStyle(e, n) {
          const r = this._makeStyleAst(e, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(e, n) {
          const r = [];
          Array.isArray(e.styles)
            ? e.styles.forEach((o) => {
                "string" == typeof o
                  ? o == qn
                    ? r.push(o)
                    : n.errors.push(
                        `The provided style string value ${o} is not allowed.`
                      )
                  : r.push(o);
              })
            : r.push(e.styles);
          let s = !1,
            i = null;
          return (
            r.forEach((o) => {
              if (ru(o)) {
                const a = o,
                  l = a.easing;
                if ((l && ((i = l), delete a.easing), !s))
                  for (let u in a)
                    if (a[u].toString().indexOf("{{") >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: r,
              easing: i,
              offset: e.offset,
              containsDynamicStyles: s,
              options: null,
            }
          );
        }
        _validateStyleAst(e, n) {
          const r = n.currentAnimateTimings;
          let s = n.currentTime,
            i = n.currentTime;
          r && i > 0 && (i -= r.duration + r.delay),
            e.styles.forEach((o) => {
              "string" != typeof o &&
                Object.keys(o).forEach((a) => {
                  if (!this._driver.validateStyleProperty(a))
                    return void n.errors.push(
                      `The provided animation property "${a}" is not a supported CSS property for animations`
                    );
                  const l = n.collectedStyles[n.currentQuerySelector],
                    u = l[a];
                  let c = !0;
                  u &&
                    (i != s &&
                      i >= u.startTime &&
                      s <= u.endTime &&
                      (n.errors.push(
                        `The CSS property "${a}" that exists between the times of "${u.startTime}ms" and "${u.endTime}ms" is also being animated in a parallel animation between the times of "${i}ms" and "${s}ms"`
                      ),
                      (c = !1)),
                    (i = u.startTime)),
                    c && (l[a] = { startTime: i, endTime: s }),
                    n.options &&
                      (function (t, e, n) {
                        const r = e.params || {},
                          s = GD(t);
                        s.length &&
                          s.forEach((i) => {
                            r.hasOwnProperty(i) ||
                              n.push(
                                `Unable to resolve the local animation param ${i} in the given list of values`
                              );
                          });
                      })(o[a], n.options, n.errors);
                });
            });
        }
        visitKeyframes(e, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              r
            );
          let i = 0;
          const o = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = e.steps.map((_) => {
            const y = this._makeStyleAst(_, n);
            let v =
                null != y.offset
                  ? y.offset
                  : (function (t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((n) => {
                          if (ru(n) && n.hasOwnProperty("offset")) {
                            const r = n;
                            (e = parseFloat(r.offset)), delete r.offset;
                          }
                        });
                      else if (ru(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(y.styles),
              w = 0;
            return (
              null != v && (i++, (w = y.offset = v)),
              (l = l || w < 0 || w > 1),
              (a = a || w < u),
              (u = w),
              o.push(w),
              y
            );
          });
          l &&
            n.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            a &&
              n.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const d = e.steps.length;
          let f = 0;
          i > 0 && i < d
            ? n.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == i && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            m = n.currentAnimateTimings,
            g = m.duration;
          return (
            c.forEach((_, y) => {
              const v = f > 0 ? (y == h ? 1 : f * y) : o[y],
                w = v * g;
              (n.currentTime = p + m.delay + w),
                (m.duration = w),
                this._validateStyleAst(_, n),
                (_.offset = v),
                r.styles.push(_);
            }),
            r
          );
        }
        visitReference(e, n) {
          return {
            type: 8,
            animation: wt(this, Oo(e.animation), n),
            options: Jr(e.options),
          };
        }
        visitAnimateChild(e, n) {
          return n.depCount++, { type: 9, options: Jr(e.options) };
        }
        visitAnimateRef(e, n) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, n),
            options: Jr(e.options),
          };
        }
        visitQuery(e, n) {
          const r = n.currentQuerySelector,
            s = e.options || {};
          n.queryCount++, (n.currentQuery = e);
          const [i, o] = (function (t) {
            const e = !!t.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              e && (t = t.replace(VL, "")),
              (t = t
                .replace(/@\*/g, Zl)
                .replace(/@\w+/g, (n) => Zl + "-" + n.substr(1))
                .replace(/:animating/g, Rh)),
              [t, e]
            );
          })(e.selector);
          (n.currentQuerySelector = r.length ? r + " " + i : i),
            bt(n.collectedStyles, n.currentQuerySelector, {});
          const a = wt(this, Oo(e.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: i,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: o,
              animation: a,
              originalSelector: e.selector,
              options: Jr(e.options),
            }
          );
        }
        visitStagger(e, n) {
          n.currentQuery ||
            n.errors.push("stagger() can only be used inside of query()");
          const r =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Yl(e.timings, n.errors, !0);
          return {
            type: 12,
            animation: wt(this, Oo(e.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class UL {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function ru(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function Jr(t) {
        return (
          t
            ? (t = ui(t)).params &&
              (t.params = (function (t) {
                return t ? ui(t) : null;
              })(t.params))
            : (t = {}),
          t
        );
      }
      function kh(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function Lh(t, e, n, r, s, i, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: r,
          duration: s,
          delay: i,
          totalTime: s + i,
          easing: o,
          subTimeline: a,
        };
      }
      class su {
        constructor() {
          this._map = new Map();
        }
        consume(e) {
          let n = this._map.get(e);
          return n ? this._map.delete(e) : (n = []), n;
        }
        append(e, n) {
          let r = this._map.get(e);
          r || this._map.set(e, (r = [])), r.push(...n);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const GL = new RegExp(":enter", "g"),
        KL = new RegExp(":leave", "g");
      function Vh(t, e, n, r, s, i = {}, o = {}, a, l, u = []) {
        return new ZL().buildKeyframes(t, e, n, r, s, i, o, a, l, u);
      }
      class ZL {
        buildKeyframes(e, n, r, s, i, o, a, l, u, c = []) {
          u = u || new su();
          const d = new jh(e, n, u, s, i, c, []);
          (d.options = l),
            d.currentTimeline.setStyles([o], null, d.errors, l),
            wt(this, r, d);
          const f = d.timelines.filter((h) => h.containsAnimation());
          if (f.length && Object.keys(a).length) {
            const h = f[f.length - 1];
            h.allowOnlyTimelineStyles() || h.setStyles([a], null, d.errors, l);
          }
          return f.length
            ? f.map((h) => h.buildKeyframes())
            : [Lh(n, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(e, n) {}
        visitState(e, n) {}
        visitTransition(e, n) {}
        visitAnimateChild(e, n) {
          const r = n.subInstructions.consume(n.element);
          if (r) {
            const s = n.createSubContext(e.options),
              i = n.currentTimeline.currentTime,
              o = this._visitSubInstructions(r, s, s.options);
            i != o && n.transformIntoNewTimeline(o);
          }
          n.previousNode = e;
        }
        visitAnimateRef(e, n) {
          const r = n.createSubContext(e.options);
          r.transformIntoNewTimeline(),
            this.visitReference(e.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = e);
        }
        _visitSubInstructions(e, n, r) {
          let i = n.currentTimeline.currentTime;
          const o = null != r.duration ? Zr(r.duration) : null,
            a = null != r.delay ? Zr(r.delay) : null;
          return (
            0 !== o &&
              e.forEach((l) => {
                const u = n.appendInstructionToTimeline(l, o, a);
                i = Math.max(i, u.duration + u.delay);
              }),
            i
          );
        }
        visitReference(e, n) {
          n.updateOptions(e.options, !0),
            wt(this, e.animation, n),
            (n.previousNode = e);
        }
        visitSequence(e, n) {
          const r = n.subContextCount;
          let s = n;
          const i = e.options;
          if (
            i &&
            (i.params || i.delay) &&
            ((s = n.createSubContext(i)),
            s.transformIntoNewTimeline(),
            null != i.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(),
              (s.previousNode = iu));
            const o = Zr(i.delay);
            s.delayNextStep(o);
          }
          e.steps.length &&
            (e.steps.forEach((o) => wt(this, o, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > r && s.transformIntoNewTimeline()),
            (n.previousNode = e);
        }
        visitGroup(e, n) {
          const r = [];
          let s = n.currentTimeline.currentTime;
          const i = e.options && e.options.delay ? Zr(e.options.delay) : 0;
          e.steps.forEach((o) => {
            const a = n.createSubContext(e.options);
            i && a.delayNextStep(i),
              wt(this, o, a),
              (s = Math.max(s, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((o) => n.currentTimeline.mergeTimelineCollectedStyles(o)),
            n.transformIntoNewTimeline(s),
            (n.previousNode = e);
        }
        _visitTiming(e, n) {
          if (e.dynamic) {
            const r = e.strValue;
            return Yl(n.params ? Jl(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
            s = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), s.snapshotCurrentStyles());
          const i = e.style;
          5 == i.type
            ? this.visitKeyframes(i, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(i, n),
              s.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = e);
        }
        visitStyle(e, n) {
          const r = n.currentTimeline,
            s = n.currentAnimateTimings;
          !s && r.getCurrentStyleProperties().length && r.forwardFrame();
          const i = (s && s.easing) || e.easing;
          e.isEmptyStep
            ? r.applyEmptyStep(i)
            : r.setStyles(e.styles, i, n.errors, n.options),
            (n.previousNode = e);
        }
        visitKeyframes(e, n) {
          const r = n.currentAnimateTimings,
            s = n.currentTimeline.duration,
            i = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * i),
                a.setStyles(l.styles, l.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(s + i),
            (n.previousNode = e);
        }
        visitQuery(e, n) {
          const r = n.currentTimeline.currentTime,
            s = e.options || {},
            i = s.delay ? Zr(s.delay) : 0;
          i &&
            (6 === n.previousNode.type ||
              (0 == r &&
                n.currentTimeline.getCurrentStyleProperties().length)) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = iu));
          let o = r;
          const a = n.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!s.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            n.currentQueryIndex = c;
            const d = n.createSubContext(e.options, u);
            i && d.delayNextStep(i),
              u === n.element && (l = d.currentTimeline),
              wt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (o = Math.max(o, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(o),
            l &&
              (n.currentTimeline.mergeTimelineCollectedStyles(l),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = e);
        }
        visitStagger(e, n) {
          const r = n.parentContext,
            s = n.currentTimeline,
            i = e.timings,
            o = Math.abs(i.duration),
            a = o * (n.currentQueryTotal - 1);
          let l = o * n.currentQueryIndex;
          switch (i.duration < 0 ? "reverse" : i.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = n.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          wt(this, e.animation, n),
            (n.previousNode = e),
            (r.currentStaggerTime =
              s.currentTime - d + (s.startTime - r.currentTimeline.startTime));
        }
      }
      const iu = {};
      class jh {
        constructor(e, n, r, s, i, o, a, l) {
          (this._driver = e),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = s),
            (this._leaveClassName = i),
            (this.errors = o),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = iu),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new ou(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, n) {
          if (!e) return;
          const r = e;
          let s = this.options;
          null != r.duration && (s.duration = Zr(r.duration)),
            null != r.delay && (s.delay = Zr(r.delay));
          const i = r.params;
          if (i) {
            let o = s.params;
            o || (o = this.options.params = {}),
              Object.keys(i).forEach((a) => {
                (!n || !o.hasOwnProperty(a)) &&
                  (o[a] = Jl(i[a], o, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (e.params = {});
              Object.keys(n).forEach((s) => {
                r[s] = n[s];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, n, r) {
          const s = n || this.element,
            i = new jh(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, r || 0)
            );
          return (
            (i.previousNode = this.previousNode),
            (i.currentAnimateTimings = this.currentAnimateTimings),
            (i.options = this._copyOptions()),
            i.updateOptions(e),
            (i.currentQueryIndex = this.currentQueryIndex),
            (i.currentQueryTotal = this.currentQueryTotal),
            (i.parentContext = this),
            this.subContextCount++,
            i
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = iu),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, n, r) {
          const s = {
              duration: null != n ? n : e.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != r ? r : 0) +
                e.delay,
              easing: "",
            },
            i = new YL(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              s,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(i), s;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, n, r, s, i, o) {
          let a = [];
          if ((s && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(GL, "." + this._enterClassName)).replace(
              KL,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, e, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !i &&
              0 == a.length &&
              o.push(
                `\`query("${n}")\` returned zero elements. (Use \`query("${n}", { optional: true })\` if you wish to allow this.)`
              ),
            a
          );
        }
      }
      class ou {
        constructor(e, n, r, s) {
          (this._driver = e),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const n =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || n
            ? (this.forwardTime(this.currentTime + e),
              n && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, n) {
          return (
            this.applyStylesToKeyframe(),
            new ou(
              this._driver,
              e,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, n) {
          (this._localTimelineStyles[e] = n),
            (this._globalTimelineStyles[e] = n),
            (this._styleSummary[e] = { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && (this._previousKeyframe.easing = e),
            Object.keys(this._globalTimelineStyles).forEach((n) => {
              (this._backFill[n] = this._globalTimelineStyles[n] || qn),
                (this._currentKeyframe[n] = qn);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(e, n, r, s) {
          n && (this._previousKeyframe.easing = n);
          const i = (s && s.params) || {},
            o = (function (t, e) {
              const n = {};
              let r;
              return (
                t.forEach((s) => {
                  "*" === s
                    ? ((r = r || Object.keys(e)),
                      r.forEach((i) => {
                        n[i] = qn;
                      }))
                    : yr(s, !1, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          Object.keys(o).forEach((a) => {
            const l = Jl(o[a], i, r);
            (this._pendingStyles[a] = l),
              this._localTimelineStyles.hasOwnProperty(a) ||
                (this._backFill[a] = this._globalTimelineStyles.hasOwnProperty(
                  a
                )
                  ? this._globalTimelineStyles[a]
                  : qn),
              this._updateStyle(a, l);
          });
        }
        applyStylesToKeyframe() {
          const e = this._pendingStyles,
            n = Object.keys(e);
          0 != n.length &&
            ((this._pendingStyles = {}),
            n.forEach((r) => {
              this._currentKeyframe[r] = e[r];
            }),
            Object.keys(this._localTimelineStyles).forEach((r) => {
              this._currentKeyframe.hasOwnProperty(r) ||
                (this._currentKeyframe[r] = this._localTimelineStyles[r]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach((e) => {
            const n = this._localTimelineStyles[e];
            (this._pendingStyles[e] = n), this._updateStyle(e, n);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let n in this._currentKeyframe) e.push(n);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          Object.keys(e._styleSummary).forEach((n) => {
            const r = this._styleSummary[n],
              s = e._styleSummary[n];
            (!r || s.time > r.time) && this._updateStyle(n, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((a, l) => {
            const u = yr(a, !0);
            Object.keys(u).forEach((c) => {
              const d = u[c];
              "!" == d ? e.add(c) : d == qn && n.add(c);
            }),
              r || (u.offset = l / this.duration),
              s.push(u);
          });
          const i = e.size ? Xl(e.values()) : [],
            o = n.size ? Xl(n.values()) : [];
          if (r) {
            const a = s[0],
              l = ui(a);
            (a.offset = 0), (l.offset = 1), (s = [a, l]);
          }
          return Lh(
            this.element,
            s,
            i,
            o,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class YL extends ou {
        constructor(e, n, r, s, i, o, a = !1) {
          super(e, n, o.delay),
            (this.keyframes = r),
            (this.preStyleProps = s),
            (this.postStyleProps = i),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: o.duration,
              delay: o.delay,
              easing: o.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: n, duration: r, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const i = [],
              o = r + n,
              a = n / o,
              l = yr(e[0], !1);
            (l.offset = 0), i.push(l);
            const u = yr(e[0], !1);
            (u.offset = XD(a)), i.push(u);
            const c = e.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = yr(e[d], !1);
              (f.offset = XD((n + f.offset * r) / o)), i.push(f);
            }
            (r = o), (n = 0), (s = ""), (e = i);
          }
          return Lh(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            s,
            !0
          );
        }
      }
      function XD(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Bh {}
      class XL extends Bh {
        normalizePropertyName(e, n) {
          return Nh(e);
        }
        normalizeStyleValue(e, n, r, s) {
          let i = "";
          const o = r.toString().trim();
          if (e3[n] && 0 !== r && "0" !== r)
            if ("number" == typeof r) i = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                s.push(`Please provide a CSS unit value for ${e}:${r}`);
            }
          return o + i;
        }
      }
      const e3 = (() =>
        (function (t) {
          const e = {};
          return t.forEach((n) => (e[n] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function ev(t, e, n, r, s, i, o, a, l, u, c, d, f) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: s,
          fromState: n,
          fromStyles: i,
          toState: r,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const $h = {};
      class tv {
        constructor(e, n, r) {
          (this._triggerName = e), (this.ast = n), (this._stateStyles = r);
        }
        match(e, n, r, s) {
          return (function (t, e, n, r, s) {
            return t.some((i) => i(e, n, r, s));
          })(this.ast.matchers, e, n, r, s);
        }
        buildStyles(e, n, r) {
          const s = this._stateStyles["*"],
            i = this._stateStyles[e],
            o = s ? s.buildStyles(n, r) : {};
          return i ? i.buildStyles(n, r) : o;
        }
        build(e, n, r, s, i, o, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || $h,
            p = this.buildStyles(r, (a && a.params) || $h, d),
            m = (l && l.params) || $h,
            g = this.buildStyles(s, m, d),
            _ = new Set(),
            y = new Map(),
            v = new Map(),
            w = "void" === s,
            F = { params: Object.assign(Object.assign({}, f), m) },
            se = c ? [] : Vh(e, n, this.ast.animation, i, o, p, g, F, u, d);
          let ae = 0;
          if (
            (se.forEach((Ze) => {
              ae = Math.max(Ze.duration + Ze.delay, ae);
            }),
            d.length)
          )
            return ev(n, this._triggerName, r, s, w, p, g, [], [], y, v, ae, d);
          se.forEach((Ze) => {
            const Ye = Ze.element,
              zn = bt(y, Ye, {});
            Ze.preStyleProps.forEach((ln) => (zn[ln] = !0));
            const Wn = bt(v, Ye, {});
            Ze.postStyleProps.forEach((ln) => (Wn[ln] = !0)),
              Ye !== n && _.add(Ye);
          });
          const at = Xl(_.values());
          return ev(n, this._triggerName, r, s, w, p, g, se, at, y, v, ae);
        }
      }
      class r3 {
        constructor(e, n, r) {
          (this.styles = e), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(e, n) {
          const r = {},
            s = ui(this.defaultParams);
          return (
            Object.keys(e).forEach((i) => {
              const o = e[i];
              null != o && (s[i] = o);
            }),
            this.styles.styles.forEach((i) => {
              if ("string" != typeof i) {
                const o = i;
                Object.keys(o).forEach((a) => {
                  let l = o[a];
                  l.length > 1 && (l = Jl(l, s, n));
                  const u = this.normalizer.normalizePropertyName(a, n);
                  (l = this.normalizer.normalizeStyleValue(a, u, l, n)),
                    (r[u] = l);
                });
              }
            }),
            r
          );
        }
      }
      class i3 {
        constructor(e, n, r) {
          (this.name = e),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = {}),
            n.states.forEach((s) => {
              this.states[s.name] = new r3(
                s.style,
                (s.options && s.options.params) || {},
                r
              );
            }),
            nv(this.states, "true", "1"),
            nv(this.states, "false", "0"),
            n.transitions.forEach((s) => {
              this.transitionFactories.push(new tv(e, s, this.states));
            }),
            (this.fallbackTransition = (function (t, e, n) {
              return new tv(
                t,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(o, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, n, r, s) {
          return (
            this.transitionFactories.find((o) => o.match(e, n, r, s)) || null
          );
        }
        matchStyles(e, n, r) {
          return this.fallbackTransition.buildStyles(e, n, r);
        }
      }
      function nv(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const a3 = new su();
      class l3 {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(e, n) {
          const r = [],
            s = Fh(this._driver, n, r);
          if (r.length)
            throw new Error(
              `Unable to build the animation due to the following errors: ${r.join(
                "\n"
              )}`
            );
          this._animations[e] = s;
        }
        _buildPlayer(e, n, r) {
          const s = e.element,
            i = FD(0, this._normalizer, 0, e.keyframes, n, r);
          return this._driver.animate(
            s,
            i,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, n, r = {}) {
          const s = [],
            i = this._animations[e];
          let o;
          const a = new Map();
          if (
            (i
              ? ((o = Vh(this._driver, n, i, Mh, Ql, {}, {}, r, a3, s)),
                o.forEach((c) => {
                  const d = bt(a, c.element, {});
                  c.postStyleProps.forEach((f) => (d[f] = null));
                }))
              : (s.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (o = [])),
            s.length)
          )
            throw new Error(
              `Unable to create the animation due to the following errors: ${s.join(
                "\n"
              )}`
            );
          a.forEach((c, d) => {
            Object.keys(c).forEach((f) => {
              c[f] = this._driver.computeStyle(d, f, qn);
            });
          });
          const u = mr(
            o.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, {}, d);
            })
          );
          return (
            (this._playersById[e] = u),
            u.onDestroy(() => this.destroy(e)),
            this.players.push(u),
            u
          );
        }
        destroy(e) {
          const n = this._getPlayer(e);
          n.destroy(), delete this._playersById[e];
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
          const n = this._playersById[e];
          if (!n)
            throw new Error(
              `Unable to find the timeline player referenced by ${e}`
            );
          return n;
        }
        listen(e, n, r, s) {
          const i = Dh(n, "", "", "");
          return Eh(this._getPlayer(e), r, i, s), () => {};
        }
        command(e, n, r, s) {
          if ("register" == r) return void this.register(e, s[0]);
          if ("create" == r) return void this.create(e, n, s[0] || {});
          const i = this._getPlayer(e);
          switch (r) {
            case "play":
              i.play();
              break;
            case "pause":
              i.pause();
              break;
            case "reset":
              i.reset();
              break;
            case "restart":
              i.restart();
              break;
            case "finish":
              i.finish();
              break;
            case "init":
              i.init();
              break;
            case "setPosition":
              i.setPosition(parseFloat(s[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const rv = "ng-animate-queued",
        sv = "ng-animate-disabled",
        iv = ".ng-animate-disabled",
        f3 = [],
        ov = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        h3 = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        jt = "__ng_removed";
      class Uh {
        constructor(e, n = "") {
          this.namespaceId = n;
          const r = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function (t) {
              return null != t ? t : null;
            })(r ? e.value : e)),
            r)
          ) {
            const i = ui(e);
            delete i.value, (this.options = i);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(e) {
          const n = e.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((s) => {
              null == r[s] && (r[s] = n[s]);
            });
          }
        }
      }
      const Fo = "void",
        Hh = new Uh(Fo);
      class p3 {
        constructor(e, n, r) {
          (this.id = e),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            Bt(n, this._hostClassName);
        }
        listen(e, n, r, s) {
          if (!this._triggers.hasOwnProperty(n))
            throw new Error(
              `Unable to listen on the animation trigger event "${r}" because the animation trigger "${n}" doesn't exist!`
            );
          if (null == r || 0 == r.length)
            throw new Error(
              `Unable to listen on the animation trigger "${n}" because the provided event is undefined!`
            );
          if (
            !(function (t) {
              return "start" == t || "done" == t;
            })(r)
          )
            throw new Error(
              `The provided animation trigger event "${r}" for the animation trigger "${n}" is not supported!`
            );
          const i = bt(this._elementListeners, e, []),
            o = { name: n, phase: r, callback: s };
          i.push(o);
          const a = bt(this._engine.statesByElement, e, {});
          return (
            a.hasOwnProperty(n) ||
              (Bt(e, Kl), Bt(e, Kl + "-" + n), (a[n] = Hh)),
            () => {
              this._engine.afterFlush(() => {
                const l = i.indexOf(o);
                l >= 0 && i.splice(l, 1), this._triggers[n] || delete a[n];
              });
            }
          );
        }
        register(e, n) {
          return !this._triggers[e] && ((this._triggers[e] = n), !0);
        }
        _getTrigger(e) {
          const n = this._triggers[e];
          if (!n)
            throw new Error(
              `The provided animation trigger "${e}" has not been registered!`
            );
          return n;
        }
        trigger(e, n, r, s = !0) {
          const i = this._getTrigger(n),
            o = new qh(this.id, n, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (Bt(e, Kl),
            Bt(e, Kl + "-" + n),
            this._engine.statesByElement.set(e, (a = {})));
          let l = a[n];
          const u = new Uh(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            (a[n] = u),
            l || (l = Hh),
            u.value !== Fo && l.value === u.value)
          ) {
            if (
              !(function (t, e) {
                const n = Object.keys(t),
                  r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let s = 0; s < n.length; s++) {
                  const i = n[s];
                  if (!e.hasOwnProperty(i) || t[i] !== e[i]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const m = [],
                g = i.matchStyles(l.value, l.params, m),
                _ = i.matchStyles(u.value, u.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    Yr(e, g), wn(e, _);
                  });
            }
            return;
          }
          const f = bt(this._engine.playersByElement, e, []);
          f.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == n &&
              m.queued &&
              m.destroy();
          });
          let h = i.matchTransition(l.value, u.value, e, u.params),
            p = !1;
          if (!h) {
            if (!s) return;
            (h = i.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: n,
              transition: h,
              fromState: l,
              toState: u,
              player: o,
              isFallbackTransition: p,
            }),
            p ||
              (Bt(e, rv),
              o.onStart(() => {
                ci(e, rv);
              })),
            o.onDone(() => {
              let m = this.players.indexOf(o);
              m >= 0 && this.players.splice(m, 1);
              const g = this._engine.playersByElement.get(e);
              if (g) {
                let _ = g.indexOf(o);
                _ >= 0 && g.splice(_, 1);
              }
            }),
            this.players.push(o),
            f.push(o),
            o
          );
        }
        deregister(e) {
          delete this._triggers[e],
            this._engine.statesByElement.forEach((n, r) => {
              delete n[e];
            }),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((s) => s.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const n = this._engine.playersByElement.get(e);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, n) {
          const r = this._engine.driver.query(e, Zl, !0);
          r.forEach((s) => {
            if (s[jt]) return;
            const i = this._engine.fetchNamespacesByElement(s);
            i.size
              ? i.forEach((o) => o.triggerLeaveAnimation(s, n, !1, !0))
              : this.clearElementCache(s);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((s) => this.clearElementCache(s))
            );
        }
        triggerLeaveAnimation(e, n, r, s) {
          const i = this._engine.statesByElement.get(e);
          if (i) {
            const o = [];
            if (
              (Object.keys(i).forEach((a) => {
                if (this._triggers[a]) {
                  const l = this.trigger(e, a, Fo, s);
                  l && o.push(l);
                }
              }),
              o.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, n),
                r && mr(o).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const n = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e);
          if (n && r) {
            const s = new Set();
            n.forEach((i) => {
              const o = i.name;
              if (s.has(o)) return;
              s.add(o);
              const l = this._triggers[o].fallbackTransition,
                u = r[o] || Hh,
                c = new Uh(Fo),
                d = new qh(this.id, o, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: o,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, n) {
          const r = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, n),
            this.triggerLeaveAnimation(e, n, !0))
          )
            return;
          let s = !1;
          if (r.totalAnimations) {
            const i = r.players.length ? r.playersByQueriedElement.get(e) : [];
            if (i && i.length) s = !0;
            else {
              let o = e;
              for (; (o = o.parentNode); )
                if (r.statesByElement.get(o)) {
                  s = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), s))
            r.markElementAsRemoved(this.id, e, !1, n);
          else {
            const i = e[jt];
            (!i || i === ov) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, n));
          }
        }
        insertNode(e, n) {
          Bt(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const s = r.player;
              if (s.destroyed) return;
              const i = r.element,
                o = this._elementListeners.get(i);
              o &&
                o.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = Dh(
                      i,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = e), Eh(r.player, a.phase, l, a.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, s) => {
              const i = r.transition.ast.depCount,
                o = s.transition.ast.depCount;
              return 0 == i || 0 == o
                ? i - o
                : this._engine.driver.containsElement(r.element, s.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let n = !1;
          return (
            this._elementListeners.has(e) && (n = !0),
            (n = !!this._queue.find((r) => r.element === e) || n),
            n
          );
        }
      }
      class g3 {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (s, i) => {});
        }
        _onRemovalComplete(e, n) {
          this.onRemovalComplete(e, n);
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && e.push(r);
              });
            }),
            e
          );
        }
        createNamespace(e, n) {
          const r = new p3(e, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[e] = r)
          );
        }
        _balanceNamespaceList(e, n) {
          const r = this._namespaceList.length - 1;
          if (r >= 0) {
            let s = !1;
            for (let i = r; i >= 0; i--)
              if (
                this.driver.containsElement(
                  this._namespaceList[i].hostElement,
                  n
                )
              ) {
                this._namespaceList.splice(i + 1, 0, e), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, e);
          } else this._namespaceList.push(e);
          return this.namespacesByHostElement.set(n, e), e;
        }
        register(e, n) {
          let r = this._namespaceLookup[e];
          return r || (r = this.createNamespace(e, n)), r;
        }
        registerTrigger(e, n, r) {
          let s = this._namespaceLookup[e];
          s && s.register(n, r) && this.totalAnimations++;
        }
        destroy(e, n) {
          if (!e) return;
          const r = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e];
            const s = this._namespaceList.indexOf(r);
            s >= 0 && this._namespaceList.splice(s, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(n));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const n = new Set(),
            r = this.statesByElement.get(e);
          if (r) {
            const s = Object.keys(r);
            for (let i = 0; i < s.length; i++) {
              const o = r[s[i]].namespaceId;
              if (o) {
                const a = this._fetchNamespace(o);
                a && n.add(a);
              }
            }
          }
          return n;
        }
        trigger(e, n, r, s) {
          if (au(n)) {
            const i = this._fetchNamespace(e);
            if (i) return i.trigger(n, r, s), !0;
          }
          return !1;
        }
        insertNode(e, n, r, s) {
          if (!au(n)) return;
          const i = n[jt];
          if (i && i.setForRemoval) {
            (i.setForRemoval = !1), (i.setForMove = !0);
            const o = this.collectedLeaveElements.indexOf(n);
            o >= 0 && this.collectedLeaveElements.splice(o, 1);
          }
          if (e) {
            const o = this._fetchNamespace(e);
            o && o.insertNode(n, r);
          }
          s && this.collectEnterElement(n);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, n) {
          n
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), Bt(e, sv))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), ci(e, sv));
        }
        removeNode(e, n, r, s) {
          if (au(n)) {
            const i = e ? this._fetchNamespace(e) : null;
            if (
              (i ? i.removeNode(n, s) : this.markElementAsRemoved(e, n, !1, s),
              r)
            ) {
              const o = this.namespacesByHostElement.get(n);
              o && o.id !== e && o.removeNode(n, s);
            }
          } else this._onRemovalComplete(n, s);
        }
        markElementAsRemoved(e, n, r, s) {
          this.collectedLeaveElements.push(n),
            (n[jt] = {
              namespaceId: e,
              setForRemoval: s,
              hasAnimation: r,
              removedBeforeQueried: !1,
            });
        }
        listen(e, n, r, s, i) {
          return au(n) ? this._fetchNamespace(e).listen(n, r, s, i) : () => {};
        }
        _buildInstruction(e, n, r, s, i) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            s,
            e.fromState.options,
            e.toState.options,
            n,
            i
          );
        }
        destroyInnerAnimations(e) {
          let n = this.driver.query(e, Zl, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(e, Rh, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(e) {
          const n = this.playersByElement.get(e);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const n = this.playersByQueriedElement.get(e);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return mr(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const n = e[jt];
          if (n && n.setForRemoval) {
            if (((e[jt] = ov), n.namespaceId)) {
              this.destroyInnerAnimations(e);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(e);
            }
            this._onRemovalComplete(e, n.setForRemoval);
          }
          this.driver.matchesElement(e, iv) &&
            this.markElementAsDisabled(e, !1),
            this.driver.query(e, iv, !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(e = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, s) =>
                this._balanceNamespaceList(r, s)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              Bt(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, e);
            } finally {
              for (let s = 0; s < r.length; s++) r[s]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? mr(n).onDone(() => {
                    r.forEach((s) => s());
                  })
                : r.forEach((s) => s());
          }
        }
        reportError(e) {
          throw new Error(
            `Unable to process animations due to the following failed trigger transitions\n ${e.join(
              "\n"
            )}`
          );
        }
        _flushAnimations(e, n) {
          const r = new su(),
            s = [],
            i = new Map(),
            o = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((I) => {
            c.add(I);
            const R = this.driver.query(I, ".ng-animate-queued", !0);
            for (let B = 0; B < R.length; B++) c.add(R[B]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = uv(f, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          h.forEach((I, R) => {
            const B = Mh + m++;
            p.set(R, B), I.forEach((X) => Bt(X, B));
          });
          const g = [],
            _ = new Set(),
            y = new Set();
          for (let I = 0; I < this.collectedLeaveElements.length; I++) {
            const R = this.collectedLeaveElements[I],
              B = R[jt];
            B &&
              B.setForRemoval &&
              (g.push(R),
              _.add(R),
              B.hasAnimation
                ? this.driver
                    .query(R, ".ng-star-inserted", !0)
                    .forEach((X) => _.add(X))
                : y.add(R));
          }
          const v = new Map(),
            w = uv(f, Array.from(_));
          w.forEach((I, R) => {
            const B = Ql + m++;
            v.set(R, B), I.forEach((X) => Bt(X, B));
          }),
            e.push(() => {
              h.forEach((I, R) => {
                const B = p.get(R);
                I.forEach((X) => ci(X, B));
              }),
                w.forEach((I, R) => {
                  const B = v.get(R);
                  I.forEach((X) => ci(X, B));
                }),
                g.forEach((I) => {
                  this.processLeaveNode(I);
                });
            });
          const F = [],
            se = [];
          for (let I = this._namespaceList.length - 1; I >= 0; I--)
            this._namespaceList[I].drainQueuedTransitions(n).forEach((B) => {
              const X = B.player,
                Be = B.element;
              if ((F.push(X), this.collectedEnterElements.length)) {
                const Tn = Be[jt];
                if (Tn && Tn.setForMove) return void X.destroy();
              }
              const Sn = !d || !this.driver.containsElement(d, Be),
                St = v.get(Be),
                _r = p.get(Be),
                Te = this._buildInstruction(B, r, _r, St, Sn);
              if (Te.errors && Te.errors.length) se.push(Te);
              else {
                if (Sn)
                  return (
                    X.onStart(() => Yr(Be, Te.fromStyles)),
                    X.onDestroy(() => wn(Be, Te.toStyles)),
                    void s.push(X)
                  );
                if (B.isFallbackTransition)
                  return (
                    X.onStart(() => Yr(Be, Te.fromStyles)),
                    X.onDestroy(() => wn(Be, Te.toStyles)),
                    void s.push(X)
                  );
                Te.timelines.forEach((Tn) => (Tn.stretchStartingKeyframe = !0)),
                  r.append(Be, Te.timelines),
                  o.push({ instruction: Te, player: X, element: Be }),
                  Te.queriedElements.forEach((Tn) => bt(a, Tn, []).push(X)),
                  Te.preStyleProps.forEach((Tn, ko) => {
                    const fu = Object.keys(Tn);
                    if (fu.length) {
                      let Xr = l.get(ko);
                      Xr || l.set(ko, (Xr = new Set())),
                        fu.forEach((Qh) => Xr.add(Qh));
                    }
                  }),
                  Te.postStyleProps.forEach((Tn, ko) => {
                    const fu = Object.keys(Tn);
                    let Xr = u.get(ko);
                    Xr || u.set(ko, (Xr = new Set())),
                      fu.forEach((Qh) => Xr.add(Qh));
                  });
              }
            });
          if (se.length) {
            const I = [];
            se.forEach((R) => {
              I.push(`@${R.triggerName} has failed due to:\n`),
                R.errors.forEach((B) => I.push(`- ${B}\n`));
            }),
              F.forEach((R) => R.destroy()),
              this.reportError(I);
          }
          const ae = new Map(),
            at = new Map();
          o.forEach((I) => {
            const R = I.element;
            r.has(R) &&
              (at.set(R, R),
              this._beforeAnimationBuild(
                I.player.namespaceId,
                I.instruction,
                ae
              ));
          }),
            s.forEach((I) => {
              const R = I.element;
              this._getPreviousPlayers(
                R,
                !1,
                I.namespaceId,
                I.triggerName,
                null
              ).forEach((X) => {
                bt(ae, R, []).push(X), X.destroy();
              });
            });
          const Ze = g.filter((I) => dv(I, l, u)),
            Ye = new Map();
          lv(Ye, this.driver, y, u, qn).forEach((I) => {
            dv(I, l, u) && Ze.push(I);
          });
          const Wn = new Map();
          h.forEach((I, R) => {
            lv(Wn, this.driver, new Set(I), l, "!");
          }),
            Ze.forEach((I) => {
              const R = Ye.get(I),
                B = Wn.get(I);
              Ye.set(I, Object.assign(Object.assign({}, R), B));
            });
          const ln = [],
            di = [],
            fi = {};
          o.forEach((I) => {
            const { element: R, player: B, instruction: X } = I;
            if (r.has(R)) {
              if (c.has(R))
                return (
                  B.onDestroy(() => wn(R, X.toStyles)),
                  (B.disabled = !0),
                  B.overrideTotalTime(X.totalTime),
                  void s.push(B)
                );
              let Be = fi;
              if (at.size > 1) {
                let St = R;
                const _r = [];
                for (; (St = St.parentNode); ) {
                  const Te = at.get(St);
                  if (Te) {
                    Be = Te;
                    break;
                  }
                  _r.push(St);
                }
                _r.forEach((Te) => at.set(Te, Be));
              }
              const Sn = this._buildAnimation(B.namespaceId, X, ae, i, Wn, Ye);
              if ((B.setRealPlayer(Sn), Be === fi)) ln.push(B);
              else {
                const St = this.playersByElement.get(Be);
                St && St.length && (B.parentPlayer = mr(St)), s.push(B);
              }
            } else
              Yr(R, X.fromStyles),
                B.onDestroy(() => wn(R, X.toStyles)),
                di.push(B),
                c.has(R) && s.push(B);
          }),
            di.forEach((I) => {
              const R = i.get(I.element);
              if (R && R.length) {
                const B = mr(R);
                I.setRealPlayer(B);
              }
            }),
            s.forEach((I) => {
              I.parentPlayer ? I.syncPlayerEvents(I.parentPlayer) : I.destroy();
            });
          for (let I = 0; I < g.length; I++) {
            const R = g[I],
              B = R[jt];
            if ((ci(R, Ql), B && B.hasAnimation)) continue;
            let X = [];
            if (a.size) {
              let Sn = a.get(R);
              Sn && Sn.length && X.push(...Sn);
              let St = this.driver.query(R, Rh, !0);
              for (let _r = 0; _r < St.length; _r++) {
                let Te = a.get(St[_r]);
                Te && Te.length && X.push(...Te);
              }
            }
            const Be = X.filter((Sn) => !Sn.destroyed);
            Be.length ? E3(this, R, Be) : this.processLeaveNode(R);
          }
          return (
            (g.length = 0),
            ln.forEach((I) => {
              this.players.push(I),
                I.onDone(() => {
                  I.destroy();
                  const R = this.players.indexOf(I);
                  this.players.splice(R, 1);
                }),
                I.play();
            }),
            ln
          );
        }
        elementContainsData(e, n) {
          let r = !1;
          const s = n[jt];
          return (
            s && s.setForRemoval && (r = !0),
            this.playersByElement.has(n) && (r = !0),
            this.playersByQueriedElement.has(n) && (r = !0),
            this.statesByElement.has(n) && (r = !0),
            this._fetchNamespace(e).elementContainsData(n) || r
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, n, r, s, i) {
          let o = [];
          if (n) {
            const a = this.playersByQueriedElement.get(e);
            a && (o = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !i || i == Fo;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != s) || o.push(u);
              });
            }
          }
          return (
            (r || s) &&
              (o = o.filter(
                (a) => !((r && r != a.namespaceId) || (s && s != a.triggerName))
              )),
            o
          );
        }
        _beforeAnimationBuild(e, n, r) {
          const i = n.element,
            o = n.isRemovalTransition ? void 0 : e,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const l of n.timelines) {
            const u = l.element,
              c = u !== i,
              d = bt(r, u, []);
            this._getPreviousPlayers(u, c, o, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          Yr(i, n.fromStyles);
        }
        _buildAnimation(e, n, r, s, i, o) {
          const a = n.triggerName,
            l = n.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const m = p.element;
              c.add(m);
              const g = m[jt];
              if (g && g.removedBeforeQueried)
                return new li(p.duration, p.delay);
              const _ = m !== l,
                y = (function (t) {
                  const e = [];
                  return cv(t, e), e;
                })((r.get(m) || f3).map((ae) => ae.getRealPlayer())).filter(
                  (ae) => !!ae.element && ae.element === m
                ),
                v = i.get(m),
                w = o.get(m),
                F = FD(0, this._normalizer, 0, p.keyframes, v, w),
                se = this._buildPlayer(p, F, y);
              if ((p.subTimeline && s && d.add(m), _)) {
                const ae = new qh(e, a, m);
                ae.setRealPlayer(se), u.push(ae);
              }
              return se;
            });
          u.forEach((p) => {
            bt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function (t, e, n) {
                  let r;
                  if (t instanceof Map) {
                    if (((r = t.get(e)), r)) {
                      if (r.length) {
                        const s = r.indexOf(n);
                        r.splice(s, 1);
                      }
                      0 == r.length && t.delete(e);
                    }
                  } else if (((r = t[e]), r)) {
                    if (r.length) {
                      const s = r.indexOf(n);
                      r.splice(s, 1);
                    }
                    0 == r.length && delete t[e];
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => Bt(p, HD));
          const h = mr(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => ci(p, HD)), wn(l, n.toStyles);
            }),
            d.forEach((p) => {
              bt(s, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(e, n, r) {
          return n.length > 0
            ? this.driver.animate(
                e.element,
                n,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new li(e.duration, e.delay);
        }
      }
      class qh {
        constructor(e, n, r) {
          (this.namespaceId = e),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new li()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            Object.keys(this._queuedCallbacks).forEach((n) => {
              this._queuedCallbacks[n].forEach((r) => Eh(e, n, void 0, r));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const n = this._player;
          n.triggerCallback && e.onStart(() => n.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, n) {
          bt(this._queuedCallbacks, e, []).push(n);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(e);
        }
      }
      function au(t) {
        return t && 1 === t.nodeType;
      }
      function av(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function lv(t, e, n, r, s) {
        const i = [];
        n.forEach((l) => i.push(av(l)));
        const o = [];
        r.forEach((l, u) => {
          const c = {};
          l.forEach((d) => {
            const f = (c[d] = e.computeStyle(u, d, s));
            (!f || 0 == f.length) && ((u[jt] = h3), o.push(u));
          }),
            t.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => av(l, i[a++])), o;
      }
      function uv(t, e) {
        const n = new Map();
        if ((t.forEach((a) => n.set(a, [])), 0 == e.length)) return n;
        const s = new Set(e),
          i = new Map();
        function o(a) {
          if (!a) return 1;
          let l = i.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = n.has(u) ? u : s.has(u) ? 1 : o(u)), i.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = o(a);
            1 !== l && n.get(l).push(a);
          }),
          n
        );
      }
      const lu = "$$classes";
      function Bt(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t[lu];
          n || (n = t[lu] = {}), (n[e] = !0);
        }
      }
      function ci(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t[lu];
          n && delete n[e];
        }
      }
      function E3(t, e, n) {
        mr(n).onDone(() => t.processLeaveNode(e));
      }
      function cv(t, e) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          r instanceof ND ? cv(r.players, e) : e.push(r);
        }
      }
      function dv(t, e, n) {
        const r = n.get(t);
        if (!r) return !1;
        let s = e.get(t);
        return s ? r.forEach((i) => s.add(i)) : e.set(t, r), n.delete(t), !0;
      }
      class uu {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (s, i) => {}),
            (this._transitionEngine = new g3(e, n, r)),
            (this._timelineEngine = new l3(e, n, r)),
            (this._transitionEngine.onRemovalComplete = (s, i) =>
              this.onRemovalComplete(s, i));
        }
        registerTrigger(e, n, r, s, i) {
          const o = e + "-" + s;
          let a = this._triggerCache[o];
          if (!a) {
            const l = [],
              u = Fh(this._driver, i, l);
            if (l.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${l.join(
                  "\n - "
                )}`
              );
            (a = (function (t, e, n) {
              return new i3(t, e, n);
            })(s, u, this._normalizer)),
              (this._triggerCache[o] = a);
          }
          this._transitionEngine.registerTrigger(n, s, a);
        }
        register(e, n) {
          this._transitionEngine.register(e, n);
        }
        destroy(e, n) {
          this._transitionEngine.destroy(e, n);
        }
        onInsert(e, n, r, s) {
          this._transitionEngine.insertNode(e, n, r, s);
        }
        onRemove(e, n, r, s) {
          this._transitionEngine.removeNode(e, n, s || !1, r);
        }
        disableAnimations(e, n) {
          this._transitionEngine.markElementAsDisabled(e, n);
        }
        process(e, n, r, s) {
          if ("@" == r.charAt(0)) {
            const [i, o] = kD(r);
            this._timelineEngine.command(i, n, o, s);
          } else this._transitionEngine.trigger(e, n, r, s);
        }
        listen(e, n, r, s, i) {
          if ("@" == r.charAt(0)) {
            const [o, a] = kD(r);
            return this._timelineEngine.listen(o, n, a, i);
          }
          return this._transitionEngine.listen(e, n, r, s, i);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function fv(t, e) {
        let n = null,
          r = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = zh(e[0])), e.length > 1 && (r = zh(e[e.length - 1])))
            : e && (n = zh(e)),
          n || r ? new v3(t, n, r) : null
        );
      }
      let v3 = (() => {
        class t {
          constructor(n, r, s) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = s),
              (this._state = 0);
            let i = t.initialStylesByElement.get(n);
            i || t.initialStylesByElement.set(n, (i = {})),
              (this._initialStyles = i);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                wn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (wn(this._element, this._initialStyles),
                this._endStyles &&
                  (wn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Yr(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Yr(this._element, this._endStyles),
                  (this._endStyles = null)),
                wn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function zh(t) {
        let e = null;
        const n = Object.keys(t);
        for (let r = 0; r < n.length; r++) {
          const s = n[r];
          b3(s) && ((e = e || {}), (e[s] = t[s]));
        }
        return e;
      }
      function b3(t) {
        return "display" === t || "position" === t;
      }
      const hv = "animation",
        pv = "animationend";
      class T3 {
        constructor(e, n, r, s, i, o, a) {
          (this._element = e),
            (this._name = n),
            (this._duration = r),
            (this._delay = s),
            (this._easing = i),
            (this._fillMode = o),
            (this._onDoneFn = a),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = (l) => this._handleCallback(l));
        }
        apply() {
          (function (t, e) {
            const n = Gh(t, "").trim();
            let r = 0;
            n.length &&
              ((function (t, e) {
                let n = 0;
                for (let r = 0; r < t.length; r++) "," === t.charAt(r) && n++;
                return n;
              })(n) + 1,
              (e = `${n}, ${e}`)),
              cu(t, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${this._fillMode} ${this._name}`
          ),
            yv(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          gv(this._element, this._name, "paused");
        }
        resume() {
          gv(this._element, this._name, "running");
        }
        setPosition(e) {
          const n = mv(this._element, this._name);
          (this._position = e * this._duration),
            cu(this._element, "Delay", `-${this._position}ms`, n);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(e) {
          const n = e._ngTestManualTimestamp || Date.now(),
            r = 1e3 * parseFloat(e.elapsedTime.toFixed(3));
          e.animationName == this._name &&
            Math.max(n - this._startTime, 0) >= this._delay &&
            r >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            yv(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function (t, e) {
              const r = Gh(t, "").split(","),
                s = Wh(r, e);
              s >= 0 && (r.splice(s, 1), cu(t, "", r.join(",")));
            })(this._element, this._name));
        }
      }
      function gv(t, e, n) {
        cu(t, "PlayState", n, mv(t, e));
      }
      function mv(t, e) {
        const n = Gh(t, "");
        return n.indexOf(",") > 0 ? Wh(n.split(","), e) : Wh([n], e);
      }
      function Wh(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function yv(t, e, n) {
        n ? t.removeEventListener(pv, e) : t.addEventListener(pv, e);
      }
      function cu(t, e, n, r) {
        const s = hv + e;
        if (null != r) {
          const i = t.style[s];
          if (i.length) {
            const o = i.split(",");
            (o[r] = n), (n = o.join(","));
          }
        }
        t.style[s] = n;
      }
      function Gh(t, e) {
        return t.style[hv + e] || "";
      }
      class _v {
        constructor(e, n, r, s, i, o, a, l) {
          (this.element = e),
            (this.keyframes = n),
            (this.animationName = r),
            (this._duration = s),
            (this._delay = i),
            (this._finalStyles = a),
            (this._specialStyles = l),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = o || "linear"),
            (this.totalTime = s + i),
            this._buildStyler();
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        destroy() {
          this.init(),
            !(this._state >= 4) &&
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach((e) => e()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach((e) => e()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            !(this._state >= 3) &&
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(e) {
          this._styler.setPosition(e);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          (this._state = 0),
            this._styler.destroy(),
            this._buildStyler(),
            this._styler.apply();
        }
        _buildStyler() {
          this._styler = new T3(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
        beforeDestroy() {
          this.init();
          const e = {};
          if (this.hasStarted()) {
            const n = this._state >= 3;
            Object.keys(this._finalStyles).forEach((r) => {
              "offset" != r &&
                (e[r] = n ? this._finalStyles[r] : Oh(this.element, r));
            });
          }
          this.currentSnapshot = e;
        }
      }
      class x3 extends li {
        constructor(e, n) {
          super(),
            (this.element = e),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = BD(n));
        }
        init() {
          this.__initialized ||
            !this._startingStyles ||
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach((e) => {
              this._startingStyles[e] = this.element.style[e];
            }),
            super.init());
        }
        play() {
          !this._startingStyles ||
            (this.init(),
            Object.keys(this._styles).forEach((e) =>
              this.element.style.setProperty(e, this._styles[e])
            ),
            super.play());
        }
        destroy() {
          !this._startingStyles ||
            (Object.keys(this._startingStyles).forEach((e) => {
              const n = this._startingStyles[e];
              n
                ? this.element.style.setProperty(e, n)
                : this.element.style.removeProperty(e);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class Cv {
        constructor() {
          this._count = 0;
        }
        validateStyleProperty(e) {
          return wh(e);
        }
        matchesElement(e, n) {
          return Sh(e, n);
        }
        containsElement(e, n) {
          return Th(e, n);
        }
        query(e, n, r) {
          return Ih(e, n, r);
        }
        computeStyle(e, n, r) {
          return window.getComputedStyle(e)[n];
        }
        buildKeyframeElement(e, n, r) {
          r = r.map((a) => BD(a));
          let s = `@keyframes ${n} {\n`,
            i = "";
          r.forEach((a) => {
            i = " ";
            const l = parseFloat(a.offset);
            (s += `${i}${100 * l}% {\n`),
              (i += " "),
              Object.keys(a).forEach((u) => {
                const c = a[u];
                switch (u) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      c && (s += `${i}animation-timing-function: ${c};\n`)
                    );
                  default:
                    return void (s += `${i}${u}: ${c};\n`);
                }
              }),
              (s += `${i}}\n`);
          }),
            (s += "}\n");
          const o = document.createElement("style");
          return (o.textContent = s), o;
        }
        animate(e, n, r, s, i, o = [], a) {
          const l = o.filter((g) => g instanceof _v),
            u = {};
          QD(r, s) &&
            l.forEach((g) => {
              let _ = g.currentSnapshot;
              Object.keys(_).forEach((y) => (u[y] = _[y]));
            });
          const c = (function (t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach((r) => {
                  Object.keys(r).forEach((s) => {
                    "offset" == s || "easing" == s || (e[s] = r[s]);
                  });
                }),
              e
            );
          })((n = KD(e, n, u)));
          if (0 == r) return new x3(e, c);
          const d = "gen_css_kf_" + this._count++,
            f = this.buildKeyframeElement(e, d, n);
          (function (t) {
            var e;
            const n =
              null === (e = t.getRootNode) || void 0 === e ? void 0 : e.call(t);
            return "undefined" != typeof ShadowRoot && n instanceof ShadowRoot
              ? n
              : document.head;
          })(e).appendChild(f);
          const p = fv(e, n),
            m = new _v(e, n, d, r, s, i, c, p);
          return (
            m.onDestroy(() =>
              (function (t) {
                t.parentNode.removeChild(t);
              })(f)
            ),
            m
          );
        }
      }
      class vv {
        constructor(e, n, r, s) {
          (this.element = e),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(e, n, r) {
          return e.animate(n, r);
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach((n) => {
              "offset" != n &&
                (e[n] = this._finished
                  ? this._finalKeyframe[n]
                  : Oh(this.element, n));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class L3 {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            bv().toString()
          )),
            (this._cssKeyframesDriver = new Cv());
        }
        validateStyleProperty(e) {
          return wh(e);
        }
        matchesElement(e, n) {
          return Sh(e, n);
        }
        containsElement(e, n) {
          return Th(e, n);
        }
        query(e, n, r) {
          return Ih(e, n, r);
        }
        computeStyle(e, n, r) {
          return window.getComputedStyle(e)[n];
        }
        overrideWebAnimationsSupport(e) {
          this._isNativeImpl = e;
        }
        animate(e, n, r, s, i, o = [], a) {
          if (!a && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(e, n, r, s, i, o);
          const c = {
            duration: r,
            delay: s,
            fill: 0 == s ? "both" : "forwards",
          };
          i && (c.easing = i);
          const d = {},
            f = o.filter((p) => p instanceof vv);
          QD(r, s) &&
            f.forEach((p) => {
              let m = p.currentSnapshot;
              Object.keys(m).forEach((g) => (d[g] = m[g]));
            });
          const h = fv(e, (n = KD(e, (n = n.map((p) => yr(p, !1))), d)));
          return new vv(e, n, c, h);
        }
      }
      function bv() {
        return (OD() && Element.prototype.animate) || {};
      }
      let j3 = (() => {
        class t extends MD {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: Ae.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const s = Array.isArray(n) ? RD(n) : n;
            return (
              wv(this._renderer, null, r, "register", [s]),
              new B3(r, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Lr), b(Fe));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class B3 extends class {} {
        constructor(e, n) {
          super(), (this._id = e), (this._renderer = n);
        }
        create(e, n) {
          return new $3(this._id, e, n || {}, this._renderer);
        }
      }
      class $3 {
        constructor(e, n, r, s) {
          (this.id = e),
            (this.element = n),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(e, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, n);
        }
        _command(e, ...n) {
          return wv(this._renderer, this.element, this.id, e, n);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          var e, n;
          return null !==
            (n =
              null === (e = this._renderer.engine.players[+this.id]) ||
              void 0 === e
                ? void 0
                : e.getPosition()) && void 0 !== n
            ? n
            : 0;
        }
      }
      function wv(t, e, n, r, s) {
        return t.setProperty(e, `@@${n}:${r}`, s);
      }
      const Sv = "@.disabled";
      let U3 = (() => {
        class t {
          constructor(n, r, s) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = s),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (i, o) => {
                o && o.parentNode(i) && o.removeChild(i.parentNode, i);
              });
          }
          createRenderer(n, r) {
            const i = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(i);
              return (
                c ||
                  ((c = new Tv("", i, this.engine)),
                  this._rendererCache.set(i, c)),
                c
              );
            }
            const o = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(o, a, n, c.name, c);
            };
            return r.data.animation.forEach(l), new H3(this, a, i, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, s) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(s))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((i) => {
                        const [o, a] = i;
                        o(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, s]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Lr), b(uu), b(Se));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Tv {
        constructor(e, n, r) {
          (this.namespaceId = e),
            (this.delegate = n),
            (this.engine = r),
            (this.destroyNode = this.delegate.destroyNode
              ? (s) => n.destroyNode(s)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(e, n) {
          return this.delegate.createElement(e, n);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, n) {
          this.delegate.appendChild(e, n),
            this.engine.onInsert(this.namespaceId, n, e, !1);
        }
        insertBefore(e, n, r, s = !0) {
          this.delegate.insertBefore(e, n, r),
            this.engine.onInsert(this.namespaceId, n, e, s);
        }
        removeChild(e, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate, r);
        }
        selectRootElement(e, n) {
          return this.delegate.selectRootElement(e, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, n, r, s) {
          this.delegate.setAttribute(e, n, r, s);
        }
        removeAttribute(e, n, r) {
          this.delegate.removeAttribute(e, n, r);
        }
        addClass(e, n) {
          this.delegate.addClass(e, n);
        }
        removeClass(e, n) {
          this.delegate.removeClass(e, n);
        }
        setStyle(e, n, r, s) {
          this.delegate.setStyle(e, n, r, s);
        }
        removeStyle(e, n, r) {
          this.delegate.removeStyle(e, n, r);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0) && n == Sv
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, n, r);
        }
        setValue(e, n) {
          this.delegate.setValue(e, n);
        }
        listen(e, n, r) {
          return this.delegate.listen(e, n, r);
        }
        disableAnimations(e, n) {
          this.engine.disableAnimations(e, n);
        }
      }
      class H3 extends Tv {
        constructor(e, n, r, s) {
          super(n, r, s), (this.factory = e), (this.namespaceId = n);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == Sv
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, n.substr(1), r)
            : this.delegate.setProperty(e, n, r);
        }
        listen(e, n, r) {
          if ("@" == n.charAt(0)) {
            const s = (function (t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(e);
            let i = n.substr(1),
              o = "";
            return (
              "@" != i.charAt(0) &&
                ([i, o] = (function (t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(i)),
              this.engine.listen(this.namespaceId, s, i, o, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(e, n, r);
        }
      }
      let W3 = (() => {
        class t extends uu {
          constructor(n, r, s) {
            super(n.body, r, s);
          }
          ngOnDestroy() {
            this.flush();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(b(Fe), b(Ah), b(Bh));
          }),
          (t.ɵprov = U({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Iv = new J("AnimationModuleType"),
        Av = [
          { provide: MD, useClass: j3 },
          {
            provide: Bh,
            useFactory: function () {
              return new XL();
            },
          },
          { provide: uu, useClass: W3 },
          {
            provide: Lr,
            useFactory: function (t, e, n) {
              return new U3(t, e, n);
            },
            deps: [Rl, uu, Se],
          },
        ],
        Mv = [
          {
            provide: Ah,
            useFactory: function () {
              return "function" == typeof bv() ? new L3() : new Cv();
            },
          },
          { provide: Iv, useValue: "BrowserAnimations" },
          ...Av,
        ],
        Rv = [
          { provide: Ah, useClass: $D },
          { provide: Iv, useValue: "NoopAnimations" },
          ...Av,
        ];
      let Z3 = (() => {
          class t {
            static withConfig(n) {
              return { ngModule: t, providers: n.disableAnimations ? Rv : Mv };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = xn({ type: t })),
            (t.ɵinj = Ut({ providers: Mv, imports: [Hf] })),
            t
          );
        })(),
        Y3 = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = xn({ type: t, bootstrap: [SL] })),
            (t.ɵinj = Ut({ providers: [], imports: [[Hf, _L, Z3]] })),
            t
          );
        })();
      (function () {
        if (uE)
          throw new Error("Cannot enable prod mode after platform setup.");
        lE = !1;
      })(),
        TF()
          .bootstrapModule(Y3)
          .catch((t) => console.error(t));
    },
  },
  (hi) => {
    hi((hi.s = 535));
  },
]);
